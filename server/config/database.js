const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sahilpednekar7836sunkeri:Kings140@cluster1.baxn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
