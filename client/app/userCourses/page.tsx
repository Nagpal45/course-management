import apiRequest from "@/lib/apiRequest";
import Course from "@/types";
import { useEffect, useState } from "react";

const UserCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const userId = 1;

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await apiRequest.get(`/users/courses/${userId}`);
            setCourses(response.data);
        };
        fetchCourses();
    }, []);
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