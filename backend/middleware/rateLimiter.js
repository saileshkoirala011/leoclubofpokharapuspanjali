const requests = new Map();

export const rateLimiter = ({ windowMs = 60_000, maxRequests = 100 } = {}) => {
  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const current = requests.get(ip) || [];
    const validTimestamps = current.filter((time) => now - time < windowMs);

    validTimestamps.push(now);
    requests.set(ip, validTimestamps);

    if (validTimestamps.length > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please retry later.',
      });
    }

    return next();
  };
};

export default rateLimiter;
