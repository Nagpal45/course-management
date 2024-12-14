"use client";
import List from "@/components/list";
import apiRequest from "@/lib/apiRequest";
import { useUser } from "@/lib/authContext";
import Course from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }else{
            if(user.role !== 'user'){
                router.push('/');
            }
        }
      }
      , []);
    
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
        <div className="flex flex-col items-start justify-center w-full py-5 px-5">
      <h1 className="text-5xl font-semibold">My Courses</h1>
            <List courses={courses} />
        </div>
    );
}

export default UserCourses;