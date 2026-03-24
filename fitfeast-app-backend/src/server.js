// 1. මුලින්ම env vars ලෝඩ් කරන්න ඕනේ (මේක තමයි වැදගත්ම දේ!)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// 2. දැන් තමයි db එක import කරන්නේ
const { connectDB, sequelize } = require('./config/db');
require('./models'); // Load associations

// Route files
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const promoRoutes = require('./routes/promoRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/orders', orderRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.send('FitFeast Lanka MySQL API is running...');
});

const PORT = process.env.PORT || 8080;

// 3. Database එක Connect කරලා පස්සේ Sync කරන්න
const startServer = async () => {
    try {
        await connectDB(); // Connection එක චෙක් කරනවා

        // Tables ටික හදනවා (Sync කරනවා)
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced successfully and tables checked/created');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Unable to start the server:', err);
    }
};

startServer();