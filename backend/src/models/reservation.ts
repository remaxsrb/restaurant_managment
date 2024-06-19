import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Reservation = new Schema ({

    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    restaurant_id: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
    rating: {
        type: String,
    },
    user_id: {
        type: String,
        required: true
    }


}, { versionKey: false })



export default mongoose.model("Reservation", Reservation, "reservations");