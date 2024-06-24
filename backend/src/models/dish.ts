import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Ingredient = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Dish schema
const Dish = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [Ingredient] // Array of IngredientSchema
}, { versionKey: false });



export default mongoose.model("Dish", Dish, "dishes");