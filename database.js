const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOSTNAME,
        dialect: 'mssql'
    }
);
database.sync({}).then(() => console.log("Model is synced..."))
    .catch((error) => console.log("Model is not synced.. please try again ", error))

module.exports = database;