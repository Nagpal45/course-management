import { Router } from "express";
import Course from "../models/Course";

const router = Router();

router.post("/courses", async (req, res) => {
    const { title, description, duration, instructor } = req.body;
    try{
        const course = new Course({
            title, description, duration, instructor
        });
        await course.save();
        res.status(200).json({message: "Course Created"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.put("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  
  const { title, description, duration, instructor } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(courseId, {
      title,
      description,
      duration,
      instructor,
    });
    await course?.save();
    res.status(200).json({message:"Updated course"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({message:"Updated course"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
