import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Restaurant = new Schema ({

    name: {
        type: String,
        required: true,
        unique: true // not interested in a case when restaurant is a franchize
    },
    address: {
        type: String,
        required: true, 
        
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    floor_plan: {
        type: String,
        required: true
    },

    dishes: [{
        type: String,
        ref: "Dish"
    }]

}, { versionKey: false })



export default mongoose.model("Restaurant", Restaurant, "restaurants");