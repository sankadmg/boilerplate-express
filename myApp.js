const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

app.use("/public", express.static(__dirname + "/public"));

// app.use(function middleware(req, res, next) {
//   var string = req.method + " " + req.path + " - " + req.ip;
//   console.log(string);
//   next();
// });

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "/views/index.html"));
});

app.get("/json", (req, res, next) => {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "Hello json".toUpperCase(),
    });
  } else {
    res.json({
      message: "Hello json",
    });
  }
});

module.exports = app;
