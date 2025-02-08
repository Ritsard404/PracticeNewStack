const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sampledb", "root", "200303", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
