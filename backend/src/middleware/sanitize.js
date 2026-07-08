const forbiddenKeys = new Set(["__proto__", "constructor", "prototype"]);

const sanitizeString = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/[<>$]/g, "").replace(/\u0000/g, "").trim();
};

const sanitizeObject = (input) => {
  if (Array.isArray(input)) return input.map(sanitizeObject);

  if (input && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const k = typeof key === "string" ? key.trim() : key;
      if (
        typeof k !== "string" ||
        k.length === 0 ||
        k.startsWith("$") ||
        forbiddenKeys.has(k)
      ) return acc;
      acc[k] = sanitizeObject(input[key]);
      return acc;
    }, {});
  }

  return sanitizeString(input);
};

const sanitize = (req, res, next) => {
  // req.body — writable, safe to reassign
  if (req.body && typeof req.body === "object") {
    try {
      req.body = sanitizeObject(req.body);
    } catch (_) { /* ignore */ }
  }

  // req.query — READ-ONLY getter in Express 5, intentionally skipped.
  // Validation is handled per-route via express-validator.

  // req.params — mutate in-place (never reassign in Express 5)
  if (req.params && typeof req.params === "object") {
    try {
      Object.keys(req.params).forEach((k) => {
        if (typeof req.params[k] === "string") req.params[k] = sanitizeString(req.params[k]);
      });
    } catch (_) { /* ignore */ }
  }

  next();
};

export default sanitize;
