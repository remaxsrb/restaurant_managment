import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const RestaurantType = new Scheme({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('RestaurantType', RestaurantType, 'restaurant_types');