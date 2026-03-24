const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Meal = sequelize.define('Meal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carbs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isTrending: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Meal;
