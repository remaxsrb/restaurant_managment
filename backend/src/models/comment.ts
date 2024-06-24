import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new Schema ({

    restaurant_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
  


}, { versionKey: false })

export default mongoose.model("Comment", Comment, "comments");