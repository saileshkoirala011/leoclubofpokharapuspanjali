import User from '../models/User.js';
import { cacheService } from '../services/cacheService.js';
import { enqueueJob } from '../services/queueService.js';
import { hashPassword } from '../services/passwordService.js';

const ANALYTICS_CACHE_KEY = 'users:analytics:v1';

export const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const parsedPage = Math.max(1, Number(page));
  const parsedLimit = Math.min(100, Math.max(1, Number(limit)));

  const [users, total] = await Promise.all([
    User.find({}, '-passwordHash')
      .sort({ createdAt: -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit),
    User.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    data: users,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages: Math.ceil(total / parsedLimit),
    },
  });
};

export const opsetUser = async (req, res) => {
  const { email, name, status, tags = [] } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: 'email and name are required' });
  }

  const update = {
    name: name.trim(),
    status: status === 'disabled' ? 'disabled' : 'active',
    'metadata.tags': Array.isArray(tags) ? tags : [],
  };

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { $set: update, $setOnInsert: { passwordHash: hashPassword(`Temp@${Date.now()}`) } },
    { upsert: true, new: true }
  ).select('-passwordHash');

  await cacheService.del(ANALYTICS_CACHE_KEY);

  enqueueJob('USER_OPSET', {
    userId: user._id.toString(),
    action: 'upsert',
  });

  return res.status(200).json({
    success: true,
    message: 'User opset processed',
    data: user,
  });
};

export const getUserAnalytics = async (_req, res) => {
  const cached = await cacheService.get(ANALYTICS_CACHE_KEY);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).json({ success: true, cached: true, data: cached });
  }

  const [overview] = await User.aggregate([
    {
      $facet: {
        byRole: [{ $group: { _id: '$role', count: { $sum: 1 } } }],
        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
        last7Days: [
          {
            $match: {
              createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ]);

  const analytics = {
    generatedAt: new Date().toISOString(),
    byRole: overview?.byRole || [],
    byStatus: overview?.byStatus || [],
    signupsLast7Days: overview?.last7Days || [],
  };

  await cacheService.set(ANALYTICS_CACHE_KEY, analytics, 90);

  res.setHeader('Cache-Control', 'private, max-age=90, stale-while-revalidate=30');
  res.setHeader('ETag', `W/"${Buffer.from(JSON.stringify(analytics)).length}-users"`);
  res.setHeader('X-Cache', 'MISS');

  return res.status(200).json({ success: true, cached: false, data: analytics });
};
