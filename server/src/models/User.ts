import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  courses: { type: [Schema.Types.ObjectId], ref: "Course", required: true },
});

export default mongoose.model("User", userSchema);
