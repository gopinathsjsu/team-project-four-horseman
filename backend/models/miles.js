const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const miles = sequelize.define("miles", {
  id: {
    type: DT.STRING(50),
    allowNull: false,
    primaryKey: true,
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
