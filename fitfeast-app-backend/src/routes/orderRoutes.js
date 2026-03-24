const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    updateOrderToSuccess, 
    getCoachStats, 
    getAllOrders 
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.post('/webhook/payment-success', updateOrderToSuccess);
router.get('/coach/stats', protect, authorize('coach'), getCoachStats);
router.get('/admin/all', protect, authorize('admin'), getAllOrders);

module.exports = router;
