const appError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Inavlid ${err.path}: ${err.value}.`;
  return new appError(message, 400);
};

const handleDuplicateFieldsFB = (err) => {
  const value = err.errmsg.match(/(["'])(<\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use a different value!`;
  return new appError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(" ")}`;
  return new appError(message, 400);
};

const handleJWTError = () =>
  new appError("Invalid Token. Please login again.", 401);

const handleExpiredToken = () =>
  new appError("Token expired, please login again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unkown error: don't leak error details
  } else {
    // 1) Log Error
    console.error("ERROR", err);

    // 2) Send message
    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsFB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleExpiredToken();
    sendErrorProd(error, res);
  }
};
