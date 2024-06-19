import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Guest = new Schema ({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string' ,
        required: true, // regex minimal 6, max 10, 1+ capital, 3+ lower, 1+ number and 1+ special characters || mora biti hesirana
    },
    security_question: {
        type: 'string',
        required: true,
    },
    security_question_answer: {
        type: 'string',
        required: true,  //hesiraj i ovo
    },
    firstname: {
        type: 'string',
        required: true,
    },
    lastname: {
        type: 'string',
        required: true,
    },
    gender: {
        type: 'string',
        required: true,
    },
    address: {
        type: 'string',
        required: true,
    },
    phone_number: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    credit_card_number: {
        type: 'string',
        required: true,
    },
    profile_photo: {
        type: 'string'
    },
    status: {
        type: 'string',
        default: 'pending'
    },
    late_for_reservation: {
        type: Number,
        default: 0, 
        max: 3
    }
}, { versionKey: false })

export default mongoose.model("Guest", Guest, "guests");