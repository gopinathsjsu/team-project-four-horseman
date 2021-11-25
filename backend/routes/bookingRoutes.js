const express = require("express");
const {
  createBooking,
  getBookingById,
  cancelBooking,
  getBookingByUserId,
} = require("../controller/bookingsController");
const { getFlightDetails } = require("../controller/flightsController");
const { getUser } = require("../controller/userController");
const { getSeatsOfUser } = require("../models/seats");
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
    booking.seats = getSeatsOfUser(flight.seats.seatMap, booking.user);

    res.status(200).send({ ...booking });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    let bookings = await getBookingByUserId(userId);
    if (bookings.status != 200) {
      res.status(bookings.status).send({ ...bookings });
    }
    console.log("bookings", bookings);
    bookings = bookings.body;

    res.status(200).send(bookings);
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
  const { userId, pnr, flight } = reqBody;
  try {
    let [userData, bookingData, flightData] = await Promise.all([
      getUser(userId),
      getBookingById(pnr),
      getFlightDetails(flight),
    ]);
    if (
      bookingData.status != 200 ||
      userData.statusCode != 200 ||
      flightData.statusCode != 200
    ) {
      let result =
        bookingData.statusCode != 200
          ? bookingData
          : userData.statusCode != 200
          ? userData
          : flightData;
      res.status(400).send({
        error: result.body,
      });
    }
    bookingData = bookingData.body.dataValues;
    userData = userData.body.dataValues;
    flightData = { ...flightData.body[0] };
    let response = await cancelBooking(bookingData, userData, flightData);
    res.status(response.status).send(response.body);
  } catch (error) {
    console.log("Here---", error);
    res.status(500).send(error.toString());
  }
});

module.exports = router;
