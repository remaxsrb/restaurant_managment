import mongoose from "mongoose";
import { Address } from "./address";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      //no regex matching because password will be hased 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
    },
    role: { type: String, required: true, enum: ["admin", "waiter", "guest"] },
    security_question: { type: Number }, //questions are mapped to integer values so that stroring in databse becomes easier
    security_question_answer: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    address: { type: Address},
    phone_number: { type: String, match: /^06\d{8}$/},
    credit_card_number: { type: String, match: /^\d{16}$/ },
    profile_photo: { type: String, match: /\.(png|jpg)$/i },
    status: {
      type: String,
      enum: ["pending", "active", "blocked", "banned"],
    },
    late_for_reservation: { type: Number, min: 0, max: 3 },
    restaurant: { type: String, ref: "Restaurant" },
  },
  { versionKey: false }
);

export default mongoose.model("User", User, "users");
