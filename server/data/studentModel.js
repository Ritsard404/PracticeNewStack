const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isMale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "student", timestamps: false }
);

// Sync database
sequelize.sync().then(() => console.log("Database synced"));

module.exports = Student;
