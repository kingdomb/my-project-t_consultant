const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...'.cyan);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.green);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message.red);
        process.exit(1);
    }
};

module.exports = connectDB;
