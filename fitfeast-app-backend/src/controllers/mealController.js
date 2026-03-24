const { Meal } = require('../models');

// @desc    Get all meals
// @route   GET /api/meals
// @access  Public
const getMeals = async (req, res) => {
    try {
        const meals = await Meal.findAll();
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new meal
// @route   POST /api/meals
// @access  Private/Admin
const createMeal = async (req, res) => {
    const { 
        name, 
        category, 
        protein, 
        carbs, 
        fats, 
        calories, 
        price, 
        stock, 
        isTrending 
    } = req.body;

    try {
        const meal = await Meal.create({
            name,
            category,
            protein,
            carbs,
            fats,
            calories,
            price,
            stock,
            isTrending
        });

        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update meal
// @route   PUT /api/meals/:id
// @access  Private/Admin
const updateMeal = async (req, res) => {
    try {
        const meal = await Meal.findByPk(req.params.id);

        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        await meal.update(req.body);
        res.json(meal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete meal
// @route   DELETE /api/meals/:id
// @access  Private/Admin
const deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findByPk(req.params.id);

        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }

        await meal.destroy();
        res.json({ message: 'Meal removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMeals,
    createMeal,
    updateMeal,
    deleteMeal
};
