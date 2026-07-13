import mongoose from 'mongoose';

const MAX_RETRIES = 3;
let currentRetryCount = 0;
const RETRY_DELAY_MS = 5000;

let isRetrying = false;


const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI)
            throw new Error("MONGO_URI is not defined in the environment variables.");

        console.log('⏳ Attempting to connect to MongoDB...');

        if (mongoose.connection.readyState !== 0)
            await mongoose.disconnect();

        const options = { serverSelectionTimeoutMS: 5000 };

        const conn = await mongoose.connect(`${process.env.MONGO_URI}/car-rental`, options);

        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);

        currentRetryCount = 0;
        isRetrying = false;

    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        handleRetry();
    }
};

function handleRetry() {

    if (isRetrying) return;
    isRetrying = true;

    if (currentRetryCount < MAX_RETRIES) {
        currentRetryCount++;
        console.log(`⚠️  Network issue. Retrying connection... Attempt ${currentRetryCount} of ${MAX_RETRIES}`);
        setTimeout(() => { isRetrying = false; connectDB(); }, RETRY_DELAY_MS);
    } else {
        console.error('🚨 Maximum retry attempts reached. Could not connect to MongoDB.');
        process.exit(1);
    }
}

mongoose.connection.on('disconnected', () => {
    console.warn('🔴 MongoDB disconnected! Trying to reconnect...');
    handleRetry();
});

export default connectDB;