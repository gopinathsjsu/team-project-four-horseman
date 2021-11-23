const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { flights } = require("../models/index");

const getFlights = async (from, to, deptTime) => {
  try {
    const flightsData = await flights.findAll({
      where: {
        from,
        to,
      },
    });
    if (flightsData !== undefined && flightsData !== null) {
      //   console.log("Flights: ", flightsData);
      return {
        statusCode: 200,
        body: flightsData,
      };
    }
    return {
      statusCode: 404,
      body: "No flights for these dates.",
    };
  } catch (err) {
    console.log("Error while fetching Flights: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  getFlights,
};
