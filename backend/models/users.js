const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;
const salt = 10;

const users = sequelize.define(
  "users",
  {
    user_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    first_name: {
      type: DT.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DT.STRING(50),
      allowNull: false,
    },
    phone_number: {
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
    street_address: {
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
    milesId: {
      type: DT.UUID,
      defaultValue: DT.UUIDV1,
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
