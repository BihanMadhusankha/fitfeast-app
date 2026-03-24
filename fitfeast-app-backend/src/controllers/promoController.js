const { Coach } = require('../models');

// @desc    Validate promo code
// @route   POST /api/promo/validate
// @access  Public
const validatePromoCode = async (req, res) => {
    const { promoCode } = req.body;

    try {
        const coach = await Coach.findOne({ where: { promoCode } });

        if (!coach) {
            return res.status(404).json({ message: 'Invalid Promo Code' });
        }

        res.json({
            discountRate: 0.05,
            gymAddress: coach.gymAddress,
            coachId: coach.id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { validatePromoCode };
