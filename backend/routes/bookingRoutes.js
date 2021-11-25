const express = require("express");
const {
  createBooking,
  getBookingById,
} = require("../controller/bookingsController");
const { getFlightDetails } = require("../controller/flightsController");
const { getUser } = require("../controller/userController");
const router = express.Router();

router.get("/:pnr", async (req, res) => {
  const pnr = req.params.pnr;
  try {
    let booking = await getBookingById(pnr);
    if (booking.status != 200) {
      res.status(booking.status).send({ ...booking.body });
    }
    booking = booking.body.dataValues;

    let flight = await getFlightDetails(booking.flight);
    if (flight.statusCode != 200) {
      res.status(flight.statusCode).send({
        ...flight.body,
      });
    }
    flight = { ...flight.body[0] };
    booking.flight = flight;
    booking.seats = booking;

    res.status(200).send({ ...booking });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post("/create", async (req, res) => {
  const reqBody = req.body;
  const { userId, flight, milesUsed, seats } = reqBody;
  //Check if flight exists
  let [userData, flightData] = await Promise.all([
    getUser(userId),
    getFlightDetails(flight),
  ]);
  if (flightData.statusCode != 200 || userData.statusCode != 200) {
    let result = flightData.statusCode != 200 ? flightData : userData;
    res.status(result.statusCode).send({
      error: result.body,
    });
  }
  let response = await createBooking(userData, flightData, milesUsed, seats);
  res.status(response.status).send(response.body);
});

router.post("/cancel", async (req, res) => {
  const reqBody = req.body;
  const { userId, bookingId } = reqBody;
  //Check if flight exists
  let [userData, flightData] = await Promise.all([
    getUser(userId),
    getBookingDetails(bookingId),
  ]);
  if (flightData.statusCode != 200 || userData.statusCode != 200) {
    let result = flightData.statusCode != 200 ? flightData : userData;
    res.status(result.statusCode).send({
      error: result.body,
    });
  }
  let response = await createBooking(userData, flightData, milesUsed, seats);
  res.status(response.status).send(response.body);
});

// router.post("/create", async (req, res) => {
//   const reqBody = req.body;
//   const { userId, flight, milesUsed, seats } = reqBody;
//   //Check if flight exists
//   let [userData, flightData] = await Promise.all([
//     getUser(userId),
//     getFlightDetails(flight),
//   ]);
//   if (flightData.statusCode != 200 || userData.statusCode != 200) {
//     let result = flightData.statusCode != 200 ? flightData : userData;
//     res.status(result.statusCode).send({
//       error: result.body,
//     });
//   }
//   let response = await createBooking(userData, flightData, milesUsed, seats);
//   res.status(response.status).send(response.body);
// });
module.exports = router;
