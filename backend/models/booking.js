const Sequelize = require("sequelize");
const dbConfig = require("./config");

const DT = Sequelize.DataTypes;

const bookings = dbConfig.define("flights", {
  id: {
    type: DT.UUID,
    primaryKey: true,
    defaultValue: DT.UUIDV1,
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
