const { sequelize } = require("../models/index");
const { QueryTypes } = require("sequelize");

const getFlights = async (from, to, deptTime) => {
  try {
    const flightsData = await sequelize.query(
      `
    SELECT id, flightCode, 
    (SELECT airportCode FROM airports WHERE id = '${from}') AS fromAirportCode, 
    (SELECT airportCode FROM airports WHERE id = '${to}') AS toAirportCode, 
    deptTime, arrTime, price 
    FROM flights 
    WHERE flights.from = '${from}' AND flights.to = '${to}'`,
      { type: QueryTypes.SELECT }
    );
    if (flightsData !== undefined && flightsData !== null) {
      let flight = JSON.parse(JSON.stringify(flightsData));
      flight = flight.filter((item) => {
        console.log(item.deptTime.toString().split("T")[0]);
        return deptTime === item.deptTime.toString().split("T")[0];
      });
      console.log("Flights: ", flight);
      if (flight.length > 0) {
        return {
          statusCode: 200,
          body: flight,
        };
      }
      return {
        statusCode: 404,
        body: "No flights for this Date.",
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
      SELECT id, flightCode, 
      (SELECT name FROM airports WHERE id = (SELECT flights.from FROM flights WHERE id = '${id}')) AS fromAirportName,
      (SELECT airportCode FROM airports WHERE id = (SELECT flights.from FROM flights WHERE id = '${id}')) AS fromAirportCode, 
      (SELECT name FROM airports WHERE id = (SELECT flights.to FROM flights WHERE id = '${id}')) AS toAirportName,
      (SELECT airportCode FROM airports WHERE id = (SELECT flights.to FROM flights WHERE id = '${id}')) AS toAirportCode,      
      deptTime, arrTime, price, tax, seats
      FROM flights 
      WHERE id = '${id}'`,
      { type: QueryTypes.SELECT }
    );
    if (flightDetails !== undefined && flightDetails !== null) {
      flightDetails = flightDetails.map((flight) => {
        let {
          id,
          flightCode,
          fromAirportName,
          fromAirportCode,
          toAirportName,
          toAirportCode,
          deptTime,
          arrTime,
          price,
          tax,
          seats,
        } = flight;
        seats = JSON.parse(seats);
        return {
          id,
          flightCode,
          fromAirportName,
          fromAirportCode,
          toAirportName,
          toAirportCode,
          deptTime,
          arrTime,
          price,
          tax,
          seats,
        };
      });
      return {
        statusCode: 200,
        body: flightDetails,
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

module.exports = {
  getFlights,
  getFlightDetails,
};
