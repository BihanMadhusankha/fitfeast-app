const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');
require('./models'); // Load associations

// Route files
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const promoRoutes = require('./routes/promoRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

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

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
