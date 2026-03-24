const express = require('express');
const router = express.Router();
const { 
    getMeals, 
    createMeal, 
    updateMeal, 
    deleteMeal 
} = require('../controllers/mealController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getMeals);
router.post('/', protect, authorize('admin'), createMeal);
router.put('/:id', protect, authorize('admin'), updateMeal);
router.delete('/:id', protect, authorize('admin'), deleteMeal);

module.exports = router;
