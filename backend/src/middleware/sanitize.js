const forbiddenKeys = new Set(["__proto__", "constructor", "prototype"]);

const sanitizeString = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/[<>$]/g, "")
    .replace(/\u0000/g, "")
    .trim();
};

const sanitizeObject = (input) => {
  if (Array.isArray(input)) {
    return input.map(sanitizeObject);
  }

  if (input && typeof input === "object") {
    return Object.keys(input).reduce((sanitized, key) => {
      const normalizedKey = typeof key === "string" ? key.trim() : key;

      if (
        typeof normalizedKey !== "string" ||
        normalizedKey.length === 0 ||
        normalizedKey.startsWith("$") ||
        forbiddenKeys.has(normalizedKey)
      ) {
        return sanitized;
      }

      sanitized[normalizedKey] = sanitizeObject(input[key]);
      return sanitized;
    }, {});
  }

  return sanitizeString(input);
};

const sanitize = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

export default sanitize;
