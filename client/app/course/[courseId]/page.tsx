"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";
import Course from "@/types";

const CourseDetail = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
          const response = await apiRequest.get(`courses/${courseId}`);
          if (response.status === 200) {
            setCourse(response.data);
            }
            else {
                console.error("Failed to fetch course data");
                }
            }
      fetchCourse();
    }
  }, [courseId]);


  return (
    <div className="container">
      <h1>Course Details</h1>
        <div>
          <h2>{course?.title}</h2>
          <p><strong>Description:</strong> {course?.description}</p>
          <p><strong>Duration:</strong> {course?.duration} hours</p>
          <p><strong>Instructor:</strong> {course?.instructor}</p>
        </div>
    </div>
  );
};

export default CourseDetail;
