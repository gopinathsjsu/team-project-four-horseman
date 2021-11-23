const express = require("express");
const router = express.Router();

router.post("/create", async (req, res) => {
  const reqBody = req.body;
  const { userId, flight, milesUsed, seats } = reqBody;
});

module.exports = router;
