const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error("Please check your MONGO_URI in .env file. Ensure your IP is whitelisted in MongoDB Atlas.");
        process.exit(1);
    }
};

module.exports = connectDB;
