import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const Address = new Scheme({
    street: {
        type: String,
        required: true,
        
    },
    street_number: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

export default mongoose.model('Address', Address, 'addresses');