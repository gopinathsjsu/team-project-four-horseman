const express = require("express");
const bp = require("body-parser");

const app = express();
app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to FH Airlines");
});

module.exports = app;
