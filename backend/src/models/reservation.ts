import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Reservation = new Schema ({

    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    guest: { type: Schema.Types.ObjectId, ref: "User", required: true },
  table: {type: Number, required: true},
    status: {
        type: String,
        required: true,
        enum: ["pending","active", "expired"]
    },
    datetime: {
        type: Date,
        required: true,
    },
    // time: {
    //     type: Date,
    //     required: true
    // },
    showed_up: {
        type: Boolean,
        required: true,
        default: false //its logical to set showed_up to false until user shows up
    }

}, { versionKey: false })



export default mongoose.model("Reservation", Reservation, "reservations");