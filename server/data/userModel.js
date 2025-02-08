const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "user", timestamps: false }
);

// // Sync database
// sequelize.sync().then(() => console.log("Database synced user"));

module.exports = User;
