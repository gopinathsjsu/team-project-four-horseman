const { airports } = require("../models/index");

const getAirports = async () => {
  try {
    const airportsData = await airports.findAll();
    if (airportsData !== undefined && airportsData !== null) {
      return {
        statusCode: 200,
        body: airportsData,
      };
    }
    return {
      statusCode: 404,
      body: "No airports added",
    };
  } catch (err) {
    console.log("Error while fetching airports: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = getAirports;
