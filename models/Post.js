import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    location: { type: String },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model("Post", postSchema);
