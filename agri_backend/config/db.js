const mongoose = require('mongoose')

mongoose.set('debug', true)
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

connectDb();