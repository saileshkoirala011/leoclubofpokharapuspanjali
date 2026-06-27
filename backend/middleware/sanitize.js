/**
 * Middleware to sanitize request data against NoSQL injection.
 * Strips keys starting with '$' from req.body, req.query, and req.params.
 */
function sanitizeObject(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const clean = {};
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue;
    clean[key] = sanitizeObject(obj[key]);
  }
  return clean;
}

export const sanitize = (req, _res, next) => {
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.query) req.query = sanitizeObject(req.query);
  if (req.params) req.params = sanitizeObject(req.params);
  next();
};

export default sanitize;
