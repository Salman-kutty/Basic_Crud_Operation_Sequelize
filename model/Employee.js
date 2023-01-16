const { DataTypes } = require('sequelize');
require('dotenv').config();
const database = require('../database');

const Employee = database.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    empName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    empEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    empAge: {
        type: DataTypes.INTEGER,
        validate: { min: 21, max: 70 },
        defaultValue: 21
    },
    empGender: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: 'Employee_Registered_Date',
    updatedAt: 'Employee_Updated_Date',
    schema: process.env.SCHEMA
})

module.exports = Employee;