const { users } = require("../models/index");

const createUser = async (
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
  address,
  city,
  zip,
  state,
  country,
  role
) => {
  try {
    const userObject = await users.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      address,
      city,
      zip,
      state,
      country,
      role,
    });
    return {
      statusCode: 201,
      body: userObject,
    };
  } catch (err) {
    console.log("Error while creating user row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getUser = async (userID) => {
  try {
    const userObject = await users.findByPk(userID);
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
      };
    }
    return {
      statusCode: 404,
      body: "User Unauthorized",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getUserByCreds = async (email) => {
  try {
    const userObject = await users.findOne({
      where: {
        email,
      },
    });
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You are not registered. Please create an account.",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const updateUser = async (userID, updateData) => {
  try {
    const updateObject = await users.update(updateData, {
      where: { user_id: userID },
    });
    if (updateObject !== undefined && updateObject !== null) {
      return {
        statusCode: 200,
        body: updateObject,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserByCreds,
};
