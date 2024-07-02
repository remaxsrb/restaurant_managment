import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Reservation = new Schema ({

    restaurant_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
        //Time is stored in a HH:MM formar as a string and on frontend it will be converted for calulations
    }

}, { versionKey: false })



export default mongoose.model("Reservation", Reservation, "reservations");