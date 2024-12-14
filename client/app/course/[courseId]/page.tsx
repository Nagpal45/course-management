"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";
import Course from "@/types";
import Link from "next/link";
import { useUser } from "@/lib/authContext";

const CourseDetail = () => {
  const { courseId } = useParams();
  const {user} = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        const response = await apiRequest.get(`courses/${courseId}`);
        if (response.status === 200) {
          setCourse(response.data);
        } else {
          console.error("Failed to fetch course data");
        }
      };
      fetchCourse();
    }
  }, [courseId]);

  const handleEnroll = async () => {
    const response = await apiRequest.post(`/users/enroll/${courseId}`, {userId: user?.id});
    if (response.status === 200) {
      router.push('/userCourses');
    } else {
      alert(response.data.message);
    }
  }

  const handleDelete = async () => {
    const response = await apiRequest.delete(`/admin/courses/${courseId}`);
    if (response.status === 200) {
      router.push('/');
    } else {
      alert("Failed to delete course");
    }
  }

  return (
    <div className="p-5 h-[90vh] flex flex-col justify-between items-center w-full">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="font-bold text-4xl">{course?.title}</h2>
        <p className="text-lg">
          <strong>Description:</strong> {course?.description}
        </p>
        <p className="text-lg">
          <strong>Duration:</strong>{" "}
          {course?.duration !== undefined &&
            (course.duration < 1
              ? course.duration * 60 + " minutes"
              : course.duration + " hours")}
        </p>
        <p className="text-lg">
          <strong>Instructor:</strong> {course?.instructor}
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        {user?.role == "admin" ? (
          <div className="flex flex-row gap-5 w-5/6">
            <button className="bg-yellow-500 text-white rounded-xl px-4 py-3 w-5/6">
              <Link href={`/createUpdate/${course?._id}`}>Edit Course</Link>
            </button>
            <button className="bg-red-500 text-white rounded-xl px-4 py-3 w-5/6" onClick = {handleDelete}>
              Delete Course
            </button>
          </div>
        ):(
          <button className="bg-blue-500 text-white rounded-xl px-4 py-3 w-5/6" onClick={handleEnroll}>
            Enroll to the course
        </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
