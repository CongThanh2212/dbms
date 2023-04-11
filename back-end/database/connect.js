const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.NAME, process.env.PASSWORD,{
    dialect: "mysql",
    host: process.env.HOST,
    port: process.env.PORT,
    logging: false
});

sequelize
    .sync()
    .then(() => {
        console.log("Connect to database successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

module.exports = sequelize;