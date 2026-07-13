import mongoose from 'mongoose';

const carLocationSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
        index: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        default: 0
    },
    locationName: {
        type: String,
        default: "Unknown Location"
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const CarLocation = mongoose.model('CarLocation', carLocationSchema);

export default CarLocation;
