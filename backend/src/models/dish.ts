import mongoose from "mongoose";
import Ingredient from "./ingredient";

const Schema = mongoose.Schema;

let Dish = new Schema ({
    
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [{
        type: String,
        ref: "Ingredient"
    }]

}, { versionKey: false })


export default mongoose.model("Dish", Dish, "dishes");