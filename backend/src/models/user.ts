import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    security_question: { type: String },
    security_question_answer: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String },
    address: { type: String },
    phone_number: { type: String },
    credit_card_number: { type: String },
    profile_photo: { type: String },
    status: { type: String, default: "pending" },
    late_for_reservation: { type: Number, default: 0, max: 3 },
    restaurant: { type: String, ref: "Restaurant" },
  },
  { versionKey: false }
);

export default mongoose.model("User", User, "users");
