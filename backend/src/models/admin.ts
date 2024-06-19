import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema ({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

}, { versionKey: false })


export default mongoose.model("Admin", Admin, "admins");