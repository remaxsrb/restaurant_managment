import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Waiter = new Schema ({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String ,
        required: true, // regex minimal 6, max 10, 1+ capital, 3+ lower, 1+ number and 1+ special characters || mora biti hesirana
    },
    security_question: {
        type: String,
        required: true,
    },
    security_question_answer: {
        type: String,
        required: true,  //hesiraj i ovo
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
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
        unique: true
    },
    profile_photo: {
        type: String
    },
    restourant: {
        type: String,
        ref: "Restourant",
        required: true
    }

}, { versionKey: false })



export default mongoose.model("Waiter", Waiter, "waiters");