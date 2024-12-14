"use client"
import List from "@/components/list";
import apiRequest from "@/lib/apiRequest";
import Course from "@/types";
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
      <List courses={courses} />
    </div>
  );
}
