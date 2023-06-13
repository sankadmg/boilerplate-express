const express = require("express");
// const mongoose = require("mongoose");
const path = require("path");
var bodyParser = require("body-parser");
require("dotenv").config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({ time: req.time });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

app.get("/name", (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;
