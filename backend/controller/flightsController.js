const { sequelize } = require("../models/index");
const { QueryTypes } = require("sequelize");
const moment = require("moment-timezone");
const getFlights = async (from, to, deptTime) => {
  try {
    const flightsData = await sequelize.query(
      `
      SELECT flights.id, flights.flightCode,flights.deptTime, flights.arrTime, flights.price, 
      airportFrom.airportCode AS fromAirportCode, airportFrom.name AS fromAirportName, airportFrom.city AS fromAirportCity, airportFrom.tz AS fromAirportTz,
      airportTo.airportCode AS toAirportCode, airportTo.name AS toAirportName, airportTo.city AS toAirportCity, airportTo.tz AS toAirportTz 
      FROM flights 
      JOIN airports AS airportFrom ON flights.from = airportFrom.id 
      JOIN airports AS airportTo ON flights.to = airportTo.id 
      WHERE flights.from = '${from}' AND flights.to = '${to}'`,
      { type: QueryTypes.SELECT }
    );
    if (flightsData !== undefined && flightsData !== null) {
      let flight = JSON.parse(JSON.stringify(flightsData));
      console.log(flight);
      flight = flight.filter((item) => {
        return (
          deptTime ===
          moment
            .tz(item.deptTime, item.fromAirportTz)
            .format("YYYY-MM-DD[T]HH:mm:ss")
            .split("T")[0]
        );
      });
      if (flight.length > 0) {
        return {
          statusCode: 200,
          body: flight,
        };
      }
      return {
        statusCode: 404,
        body: "No flights found.",
      };
    }
    return {
      statusCode: 404,
      body: "No flights for these locations.",
    };
  } catch (err) {
    console.log("Error while fetching Flights: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getFlightDetails = async (id) => {
  try {
    let flightDetails = await sequelize.query(
      `
      SELECT flights.id, flights.flightCode, flights.seats, flights.deptTime, flights.arrTime, flights.price, flights.tax, 
      airportFrom.airportCode AS fromAirportCode, airportFrom.name AS fromAirportName, airportFrom.city AS fromAirportCity, 
      airportTo.airportCode AS toAirportCode, airportTo.name AS toAirportName, airportTo.city AS toAirportCity 
      FROM flights 
      JOIN airports AS airportFrom ON flights.from = airportFrom.id 
      JOIN airports AS airportTo ON flights.to = airportTo.id 
      WHERE flights.id = '${id}'`,
      { type: QueryTypes.SELECT }
    );
    if (flightDetails !== undefined && flightDetails !== null) {
      flightDetails = flightDetails.map((flight) => {
        return {
          ...flight,
          ...{ seats: JSON.parse(flight.seats) },
        };
      });
      if (flightDetails.length > 0) {
        return {
          statusCode: 200,
          body: flightDetails,
        };
      }
      return {
        statusCode: 404,
        body: "Flight Details not found. Check flight Id",
      };
    }
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
  getFlightDetails,
};
