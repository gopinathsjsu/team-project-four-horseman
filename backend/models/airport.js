const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const airports = sequelize.define("airports", {
  id: {
    type: DT.UUID,
    primaryKey: true,
    defaultValue: DT.UUIDV1,
  },
  name: {
    type: DT.STRING(50),
    allowNull: false,
  },
  city: {
    type: DT.STRING(50),
    allowNull: false,
  },
  airportCode: {
    type: DT.STRING(50),
    allowNull: false,
  },
  location: {
    type: DT.STRING(50),
    allowNull: false,
    unique: true,
  },
  tz: {
    type: DT.STRING(50),
    allowNull: false,
    defaultValue: "America/Los_Angeles",
  },
});

airports.sync();

module.exports = {
  airports,
};
