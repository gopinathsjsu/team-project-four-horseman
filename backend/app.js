const express = require("express");
const bp = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to FH Airlines");
});

module.exports = app;
