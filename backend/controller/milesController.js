const { miles } = require("../models/index");

const addMilesAccount = async (id) => {
  try {
    const data = await miles.create({
      id,
    });
    return {
      statusCode: 201,
      body: data,
    };
  } catch (err) {
    console.log("Error while creating Miles Account: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getMilesAccount = async (id) => {
  try {
    const milesAccount = await miles.findByPk(id);
    if (milesAccount !== undefined && milesAccount !== null) {
      return {
        statusCode: 200,
        body: milesAccount,
      };
    }
    return {
      statusCode: 404,
      body: "Miles account not found",
    };
  } catch (err) {
    console.log("Error while fetching Miles Account: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  addMilesAccount,
  getMilesAccount,
};
