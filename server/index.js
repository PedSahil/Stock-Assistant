const express = require('express');
// const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const productRoutes = require('./routes/product.route');
const distributorRoutes = require('./routes/distributor.route')
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));
app.use(express.json())

app.use(cors({ origin: 'https://stock-assistant-1.onrender.com' }));
// Connect to MongoDB
connectDB();

// Middleware
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads')); // Serve images statically
app.use('/api/products', productRoutes);
app.use('/api/distributors',distributorRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server running on https://stock-assistant-s04b.onrender.com`);
});
