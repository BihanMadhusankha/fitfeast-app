const { Order, OrderItem, Coach, User } = require('../models');
const { sequelize } = require('../config/db');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    const { 
        items, 
        totalPrice, 
        discountAmount, 
        deliveryAddress, 
        deliverySlot, 
        coachId 
    } = req.body;

    const t = await sequelize.transaction();

    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Backend Address Lock Logic
        if (coachId) {
            const coach = await Coach.findByPk(coachId);
            if (coach && deliveryAddress !== coach.gymAddress) {
                return res.status(400).json({ 
                    message: `Address Lock: Delivery address must match coach's gym address: ${coach.gymAddress}` 
                });
            }
        }

        const order = await Order.create({
            customerId: req.user.id,
            coachId,
            totalPrice,
            discountAmount,
            deliveryAddress,
            deliverySlot
        }, { transaction: t });

        // Add order items
        for (const item of items) {
            await OrderItem.create({
                OrderId: order.id,
                MealId: item.mealId,
                quantity: item.quantity,
                itemPrice: item.price
            }, { transaction: t });
        }

        await t.commit();
        res.status(201).json(order);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to success & calculate commission
// @route   POST /api/orders/webhook/payment-success
// @access  Public (Webhook)
const updateOrderToSuccess = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.paymentStatus === 'success') {
            return res.status(400).json({ message: 'Order already processed' });
        }

        order.paymentStatus = 'success';
        await order.save();

        // 10% Commission Engine using sequelize.increment
        if (order.coachId) {
            const commission = parseFloat(order.totalPrice) * 0.10;
            
            await Coach.increment(
                { 
                    totalCommission: commission,
                    ordersCount: 1
                },
                { where: { id: order.coachId } }
            );
        }

        res.json({ message: 'Order payment success updated', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get coach stats
// @route   GET /api/coach/stats
// @access  Private/Coach
const getCoachStats = async (req, res) => {
    try {
        const coach = await Coach.findOne({ where: { userId: req.user.id } });
        
        if (!coach) {
            return res.status(404).json({ message: 'Coach profile not found' });
        }

        const orders = await Order.findAll({ 
            where: { 
                coachId: coach.id, 
                paymentStatus: 'success' 
            } 
        });

        res.json({
            commissionBalance: coach.totalCommission,
            totalOrders: coach.ordersCount,
            orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: 'customer', attributes: ['name', 'email', 'phone'] },
                { model: Coach, as: 'coach', include: [{ model: User, attributes: ['name', 'email'] }] }
            ]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    updateOrderToSuccess,
    getCoachStats,
    getAllOrders
};
