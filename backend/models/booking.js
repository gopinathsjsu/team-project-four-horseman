const Sequelize = require("sequelize");
const dbConfig = require("./config");

const DT = Sequelize.DataTypes;

const bookings = dbConfig.define("bookings", {
  pnr: {
    type: DT.STRING(50),
    allowNull: false,
    primaryKey: true,
  },
  flight: {
    type: DT.STRING(50),
    allowNull: false,
  },
  user: {
    type: DT.STRING(50),
    allowNull: false,
  },
  totalCost: {
    type: DT.DOUBLE,
    allowNull: false,
  },
  milesUsed: {
    type: DT.INTEGER,
    allowNull: false,
  },
  milesEarned: {
    type: DT.INTEGER,
    allowNull: false,
  },
  seats: {
    type: DT.INTEGER,
    allowNull: false,
  },
  status: {
    type: DT.STRING(50),
    allowNull: false,
    defaultValue: "ACTIVE",
  },
});

bookings.sync();

module.exports = {
  bookings,
};
