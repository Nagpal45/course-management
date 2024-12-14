"use client"
import apiRequest from "@/lib/apiRequest";
import Course from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(()=>{
    const fetchCourses = async () =>{
      const response = await apiRequest.get('/courses');
      setCourses(response.data);
    }
    fetchCourses();
  },[])

  return (
    <div className="flex flex-col items-start justify-center w-full py-5 px-5">
      <h1 className="text-5xl font-semibold">Course List</h1>
      <div className="flex flex-row items-center justify-center w-full gap-10 flex-wrap mt-6">
        {courses && courses.map((course, index) => (
          <div key={index} className="flex flex-col border-2 rounded-lg p-3 justify-between w-[31%] h-[150px]">
            <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description && course.description.length > 50 ? course.description.slice(0, 60) + '...' : course.description}</p>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col">
                <p><span className="font-semibold">Duration:</span> {course.duration < 1 ? course.duration * 60 + ' minutes' : course.duration + ' hours'}</p>
                <p><span className="font-semibold">Instructor:</span> {course.instructor}</p>
              </div>
              <div className="flex flex-row gap-3">
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2"><Link href={`/course/${course._id}`}>
                View</Link></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
