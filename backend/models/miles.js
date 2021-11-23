const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const miles = sequelize.define("flights", {
  id: {
    type: DT.STRING(50),
    allowNull: false,
  },
  miles: {
    type: DT.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

miles.sync();

module.exports = {
  miles,
};
