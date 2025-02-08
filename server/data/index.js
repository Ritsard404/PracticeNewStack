const sequelize = require("./db"); // Import Sequelize instance
const { DataTypes } = require("sequelize");

// Import models
const Student = require("./studentModel");
const User = require("./userModel");

// Sync all models at once
sequelize
  .sync()
  .then(() => console.log("✅ All tables synced successfully"))
  .catch((error) => console.error("❌ Error syncing tables:", error));

module.exports = { Student, User };
