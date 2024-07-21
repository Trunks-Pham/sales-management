const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();
const app = express();

// Kết nối đến MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/orders', require('./src/routes/orders'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));