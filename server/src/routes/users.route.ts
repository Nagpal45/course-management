import { Router } from "express";
import User from "../models/User";
import mongoose from "mongoose";
const router = Router();

router.post("/enroll/:courseId", async (req, res) => {
  const { userId } = req.body;
  const { courseId } = req.params;

  try {
    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const user = await User.findById(userId);
    if (user) {
      user.courses.push(courseObjectId);
      await user.save();
    } else {
      res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Enrolled in Course Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.get("/courses/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("courses");
    if (user) {
      res.status(200).json(user.courses);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

export default router;
