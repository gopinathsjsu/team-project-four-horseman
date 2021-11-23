const express = require("express");
const router = express.Router();

const {
  getFlights,
  getFlightDetails,
} = require("../controller/flightsController");

router.get("/", async (req, res) => {
  const { from, to, deptTime } = req.body;
  console.log(from, to, deptTime);
  try {
    const flightsData = await getFlights(from, to, deptTime);
    res.status(200).send({
      flights: flightsData.body,
    });
  } catch (err) {
    console.log("Error encountered while searching Flights: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

router.get("/details/:flightId", async (req, res) => {
  const flightId = req.params.flightId;
  try {
    const flightsData = await getFlightDetails(flightId);
    res.status(200).send(flightsData.body[0]);
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