const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;
const salt = 10;

const users = sequelize.define(
  "users",
  {
    id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    firstName: {
      type: DT.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DT.STRING(50),
      allowNull: false,
    },
    phoneNumber: {
      type: DT.STRING(50),
      allowNull: false,
    },
    email: {
      type: DT.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DT.STRING(200),
      allowNull: false,
    },
    address: {
      type: DT.STRING(50),
      allowNull: false,
    },
    city: {
      type: DT.STRING(50),
      allowNull: false,
    },
    zip: {
      type: DT.STRING(50),
      allowNull: false,
    },
    state: {
      type: DT.STRING(50),
      allowNull: false,
    },
    country: {
      type: DT.STRING(50),
      allowNull: false,
    },
    role: {
      type: DT.STRING(50),
      allowNull: false,
      defaultValue: "user",
    },
    miles: {
      type: DT.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeCreate: (users) => {
        users.password =
          users.password !== "" ? bcrypt.hashSync(users.password, salt) : "";
      },
    },
  }
);

users.sync();

module.exports = {
  users,
};
