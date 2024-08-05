import { ValidationError } from "express-validation";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import httpStatus from "#src/constants/httpStatus.constant.js";

export default {
  handler,
  notFound,
  converter,
};

/**
 * Converts errors to ApiErrorUtils
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _
 */
function converter(err, req, res, _) {
  let convertedErr = err;

  if (err instanceof ValidationError) {
    convertedErr = new ApiErrorUtils({
      message: "Validation Error",
      errors: err.errors,
      status: err.status || 500,
      stack: err.stack,
    });
  } else if (!(err instanceof ApiErrorUtils)) {
    convertedErr = new ApiErrorUtils({
      message: err.message,
      status: err.status || 500,
      stack: err.stack,
    });
  }

  handler(convertedErr, req, res);
}

/**
 * Handle 404 error
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 */
function notFound(req, res) {
  const err = new ApiErrorUtils({
    message: "Not found",
    status: 400,
  });
  handler(err, req, res);
}

/**
 * Handle errors
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _
 */
function handler(err, req, res, _) {
  const response = {
    code: err.status || 500,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    url: req.originalUrl,
  };

  if (req.app.get("env") === "production") {
    delete response.stack;
  } else {
    console.log(response);
  }

  res.set("Content-Type", "application/json");
  res.status(response.code).json(response);
  return res.end();
}
