const express = require("express");
const path = require("path");
const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "/views/index.html"));
});

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json",
  });
});

module.exports = app;
