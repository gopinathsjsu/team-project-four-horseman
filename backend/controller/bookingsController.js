const { sequelize, users, flights, bookings } = require("../models");
const { updateSeats } = require("../models/seats");

const generatePNR = (flightDate) => {
  return (
    flightDate.flightCode.substring(0, 3) +
    String(flightDate.seats.availableSeats.toString()).padStart(3, "0")
  );
};

const createBooking = async (userData, flightData, milesUsed, seats) => {
  flightData = { ...flightData.body[0] };
  userData = { ...userData.body.dataValues };
  let totalCost = (flightData.price + flightData.tax) * seats.length;
  let milesEarned = Math.floor(totalCost);
  let userMiles = userData.miles - milesUsed + milesEarned;

  const trans = await sequelize.transaction();
  try {
    const updateUserMiles = users.update(
      { miles: userMiles },
      { where: { id: userData.id } },
      { transaction: trans }
    );
    const updateFlightSeats = flights.update(
      {
        seats: updateSeats(userData.id, flightData.seats, seats),
      },
      { where: { id: flightData.id } },
      { transaction: trans }
    );
    const createBooking = bookings.create(
      {
        pnr: generatePNR(flightData),
        flight: flightData.id,
        user: userData.id,
        seats: seats.length,
        totalCost,
        milesUsed,
        milesEarned,
      },
      { transaction: trans }
    );

    const result = await Promise.all([
      updateUserMiles,
      updateFlightSeats,
      createBooking,
    ]);
    await trans.commit();
    return { status: 200, body: result[2] };
  } catch (error) {
    console.log(error);
    await trans.rollback();
    return { status: 200, body: error.toString() };
  }
};

const getBookingById = async (pnr) => {
  try {
    const booking = await bookings.findByPk(pnr);
    // console.log(booking);
    if (booking) {
      return {
        status: 200,
        body: booking,
      };
    }
    return {
      status: 400,
      body: "Booking not found",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};
module.exports = {
  generatePNR,
  createBooking,
  getBookingById,
};
