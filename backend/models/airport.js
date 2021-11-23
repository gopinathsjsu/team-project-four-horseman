const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const airports = sequelize.define("aiports", {
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
});

airports.sync();

module.exports = {
  airports,
};
