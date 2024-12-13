import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number },
  instructor: { type: String, required: true },
});

export default mongoose.model("Course", courseSchema);
