import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Reservation = new Schema ({

    restaurant_id: {
        type: String,
        required: true,
    },
    user_id: {
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

    }
    


}, { versionKey: false })



export default mongoose.model("Reservation", Reservation, "reservations");