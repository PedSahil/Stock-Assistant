const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sahilpednekar7836sunkeri:KAnxHTo4PX1UN42P@cluster0.mongodb.net/mydb?retryWrites=true&w=majority');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
