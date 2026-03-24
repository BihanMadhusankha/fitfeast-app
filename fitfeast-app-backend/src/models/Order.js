const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    deliveryAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deliverySlot: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'success'),
        defaultValue: 'pending'
    }
});

module.exports = Order;
