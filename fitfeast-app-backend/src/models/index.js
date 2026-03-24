const User = require('./User');
const Meal = require('./Meal');
const Coach = require('./Coach');
const Order = require('./Order');
const { sequelize } = require('../config/db');

// User <-> Coach (One-to-One)
User.hasOne(Coach, { foreignKey: 'userId', as: 'coachProfile' });
Coach.belongsTo(User, { foreignKey: 'userId' });

// User (Customer) <-> Order (One-to-Many)
User.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

// Coach <-> Order (One-to-Many, Nullable)
Coach.hasMany(Order, { foreignKey: 'coachId' });
Order.belongsTo(Coach, { foreignKey: 'coachId', as: 'coach' });

// Order <-> Meal (Many-to-Many through OrderItems)
const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: require('sequelize').DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    itemPrice: {
        type: require('sequelize').DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

Order.belongsToMany(Meal, { through: OrderItem });
Meal.belongsToMany(Order, { through: OrderItem });

module.exports = {
    User,
    Meal,
    Coach,
    Order,
    OrderItem,
    sequelize
};
