"use client";
import apiRequest from "@/lib/apiRequest";
import { useUser } from "@/lib/authContext";
import Course from "@/types";
import { useEffect, useState } from "react";

const UserCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const {user} = useUser();
    
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await apiRequest.get(`/users/courses/${user?.id}`);
            setCourses(response.data);
        };
        if (user) {
            fetchCourses();
        }
    }, [user]);
    return (
        <div className="container">
            <h1>Course List</h1>
            <div>
                {courses && courses.map((course, index) => (
                    <div key={index}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <p>Duration: {course.duration < 1 ? course.duration * 60 + ' minutes' : course.duration + ' hours'}</p>
                        <p>Instructor: {course.instructor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserCourses;