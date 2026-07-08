import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formatted = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return next(new ApiError("Validation failed", 400, formatted));
  }

  next();
};

export default validate;
