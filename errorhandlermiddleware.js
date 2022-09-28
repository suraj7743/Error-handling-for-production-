const AppError = require("./AppError");

//handle the cast error Error from database
const CastErrorDatabase = (error) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

//handle the validation error Error from database

const ValidationErrorDatabase = (error) => {
  const message = `Invalid Input Error: ${error.message}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    errorName: err.name,
  });
};
const sendErrorProd = (err, res) => {
  //operational error:sending to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //programming error :NOt sending error to client
  else {
    //1) logging error for developer
    console.error("Error :", err);
    res.staus(500).json({
      status: "error",
      message: "Something went very wrong ",
    });
  }
};

module.exports = app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    if (err.name === "CastError") {
      CastErrorDatabase(err);
    }
    if (err.name === "ValiationError") {
      ValidationErrorDatabase(err);
    }
    sendErrorProd(err, res);
  }
});
