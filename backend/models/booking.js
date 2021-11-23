const Sequelize = require("sequelize");
const dbConfig = require("./config");

const DT = Sequelize.DataTypes;

const bookings = dbConfig.define("flights", {
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
    type: DT.DOUBLE(50),
    allowNull: false,
  },
  milesUsed: {
    type: DT.INTEGER(50),
    allowNull: false,
  },
  seats: {
    type: DT.INTEGER,
    allowNull: false,
  },
});

bookings.sync();

module.exports = {
  bookings,
};
