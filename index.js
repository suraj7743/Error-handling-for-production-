const express = require("express");
const app = express();
//this needs to be at the top of the code so it can throw an error if any synchronous errors are encountered
process.on("uncaughtException", (err) => {
  console.log("uncaughtException");
  console.log(err.name, err.message);
  process.exit(1); //exist the server  some tools are used in production for restarting the server
});

//operational error
//  * invalid path accessed ,
//   invalid user input (validation error  from mongoose)
//   failed to connect to server
//   failed to connect to database
//   request timeout

// programming error
//  Reading properties of undefined
//  passing a number where an object is expected
//  using await without async
//  usign req. query inseted of req. query

//express handle mainly only operational error

//this handles all undefined routes
app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "error",
    message: `Cannot find the ${req.originalUrl}on this server`,
  });
});
const server = app.listen(8000, () => {
  console.log("listening to server on port 8000");
});
//unhandled rejection refers to the unhandled promises in async code above
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
