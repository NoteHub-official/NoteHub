// Database setup for mysql2
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE ? process.env.DB_DATABASE : "mynotehub_db",
  process.env.DB_USER ? process.env.DB_USER : "mynotehub_root",
  process.env.DB_PASS ? process.env.DB_PASS : "Notehub123123",
  {
    host: process.env.DB_HOST ? process.env.DB_HOST : "127.0.0.1",
    dialect: "mysql",
  }
);
module.exports = sequelize;
/*This function is used to test your connection to the database*/
// async function test() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// test();
