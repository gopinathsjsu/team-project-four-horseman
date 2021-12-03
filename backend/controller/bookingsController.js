const { sequelize, users, flights, bookings } = require("../models");
const { updateSeats, removeUserSeats } = require("../models/seats");

const generatePNR = (flightDate) => {
  return (
    flightDate.flightCode.substring(0, 3) +
    String(flightDate.seats.pnrCount.toString()).padStart(4, "0")
  );
};

const createBooking = async (userData, flightData, milesUsed, seats) => {
  flightData = { ...flightData.body[0] };
  userData = { ...userData.body.dataValues };
  let totalCost =
    (flightData.price + flightData.tax) * seats.length - milesUsed * 0.093;
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
    return { status: 500, body: error.toString() };
  }
};

const getBookingById = async (pnr) => {
  try {
    const booking = await bookings.findByPk(pnr);
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

const getBookingByUserId = async (userId) => {
  try {
    const bookingsResponse = await bookings.findAll({
      where: { user: userId },
      order: [["createdAt", "DESC"]],
    });
    if (bookingsResponse) {
      return {
        status: 200,
        body: bookingsResponse,
      };
    }
    return {
      status: 400,
      body: "Bookings not found",
    };
  } catch (error) {
    console.log("Err", error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};

const cancelBooking = async (bookingData, userData, flightData) => {
  let updatedMiles =
    userData.miles + bookingData.milesUsed - bookingData.milesEarned;
  const trans = await sequelize.transaction();
  try {
    const updateUserMiles = users.update(
      { miles: updatedMiles },
      { where: { id: userData.id } },
      { transaction: trans }
    );
    const updateFlightSeats = flights.update(
      {
        seats: removeUserSeats(userData.id, flightData.seats),
      },
      { where: { id: flightData.id } },
      { transaction: trans }
    );
    const deleteBooking = bookings.update(
      {
        status: "CANCELLED",
      },
      {
        where: {
          pnr: bookingData.pnr,
        },
      },
      { transaction: trans }
    );

    const result = await Promise.all([
      updateUserMiles,
      updateFlightSeats,
      deleteBooking,
    ]);
    console.log({ updateUserMiles, updateFlightSeats, deleteBooking });
    await trans.commit();
    return { status: 200, body: result };
  } catch (error) {
    console.log(error);
    await trans.rollback();
    return { status: 500, body: error.toString() };
  }
};
module.exports = {
  generatePNR,
  createBooking,
  getBookingById,
  cancelBooking,
  getBookingByUserId,
};
