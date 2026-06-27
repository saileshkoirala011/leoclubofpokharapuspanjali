/**
 * Middleware to sanitize request data against NoSQL injection.
 * Strips keys starting with '$' and sanitizes nested values in req.body.
 * Note: req.query and req.params are read-only in Express 5, so we only
 * sanitize req.body (which is the primary vector for NoSQL injection).
 */
function sanitizeValue(val) {
  if (val === null || typeof val !== 'object') return val;

  if (Array.isArray(val)) {
    return val.map(sanitizeValue);
  }

  const clean = {};
  for (const key of Object.keys(val)) {
    if (key.startsWith('$')) continue;
    clean[key] = sanitizeValue(val[key]);
  }
  return clean;
}

export const sanitize = (req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }
  next();
};

export default sanitize;
