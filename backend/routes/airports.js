const express = require("express");
const router = express.Router();

const getAirports = require("../controller/airportsController");

router.get("/", async (req, res) => {
  try {
    const airports = await getAirports();
    if (airports.statusCode === 200) {
      res.status(200).send({
        airports: airports.body,
      });
    } else {
      res.status(airports.statusCode).send({
        message: airports.body,
      });
    }
  } catch (err) {
    console.log("Error encountered while searching Flights: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

module.exports = router;
