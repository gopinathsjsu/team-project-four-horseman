const express = require("express");
const router = express.Router();

const { getFlights } = require("../controller/flightsController");

router.get("/", async (req, res) => {
  const { from, to, deptTime } = req.body;
  console.log(from, to, deptTime);
  try {
    const flightsData = await getFlights(from, to, deptTime);
    // console.log("flights Data: ", flightsData);
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

module.exports = router;
