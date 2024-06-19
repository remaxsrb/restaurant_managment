import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Ingredient = new Schema ({
    
    name: {
        type: String,
        required: true,
        unique: true
    }

}, { versionKey: false })


export default mongoose.model("Ingredient", Ingredient, "ingredients");