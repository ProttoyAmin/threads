import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

export async function connectToDatabase() {
    let isConnected = false;
    mongoose.set("strictQuery", true);

    if (!MONGO_URI) throw new Error("Please, put MONGO_URI in .env.local file");

    if (isConnected) {
        console.log('MongoDB connection already established!')
    }

    try {
        const connection = await mongoose.connect(MONGO_URI);
        isConnected = true;

        return connection
    } catch (error) {
        throw error;
    }

}