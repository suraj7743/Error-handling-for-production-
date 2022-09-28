const express = require("express");
const app = express();

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
app.listen(8000, () => {
  console.log("listening to server on port 8000");
});
