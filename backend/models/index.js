/* eslint-disable no-console */
const { users } = require("./users");
const { airports } = require("./airport");
const { bookings } = require("./booking");
const { flights } = require("./flights");
const { miles } = require("./miles");
const sequelize = require("./config");

module.exports = {
  sequelize,
  users,
  airports,
  bookings,
  flights,
  miles,
};
