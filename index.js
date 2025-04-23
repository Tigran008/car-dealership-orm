const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const dealershipRoutes = require('./routes/dealerships');
app.use('/api/dealerships', dealershipRoutes);

const ratingRoutes = require('./routes/ratings');
app.use('/api/rating', ratingRoutes);

const featureRoutes = require('./routes/features');
app.use('/api/features', featureRoutes);

app.get('/', (req, res) => {
    res.send('🚗 Car Dealership API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
