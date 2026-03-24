const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Coach = sequelize.define('Coach', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    promoCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gymName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gymAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    totalCommission: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    ordersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Coach;
