import mongoose from "mongoose";


const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to database.")
    } catch (error) {
        console.log("Unable to establish connection with database.")
    }
}

export default connectToMongoDb;