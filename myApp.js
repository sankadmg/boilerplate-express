const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "/views/index.html"));
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.json({
      message: "Hello json".toUpperCase(),
    });
  } else {
    response.json({
      message: "Hello json",
    });
  }
});

module.exports = app;
