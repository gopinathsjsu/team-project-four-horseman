const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const flights = sequelize.define("flights", {
  id: {
    type: DT.UUID,
    primaryKey: true,
    defaultValue: DT.UUIDV1,
  },
  from: {
    type: DT.STRING(50),
    allowNull: false,
  },
  to: {
    type: DT.STRING(50),
    allowNull: false,
  },
  flightCode: {
    type: DT.STRING(50),
    allowNull: false,
  },
  deptTime: {
    type: DT.DATE,
    allowNull: false,
    unique: true,
  },
  arrTime: {
    type: DT.DATE,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DT.DOUBLE,
    allowNull: false,
  },
  tax: {
    type: DT.DOUBLE,
    allowNull: false,
  },
  seats: {
    type: DT.TEXT,
    allowNull: false,
  },
});

flights.sync();

module.exports = {
  flights,
};
