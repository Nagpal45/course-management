"use client";
import { useParams, useRouter} from 'next/navigation';
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";
import Course from "@/types";
import { useUser } from '@/lib/authContext';

const AddOrUpdateCourse = () => {
  const { slug } = useParams();
  const router = useRouter();
  const{user} = useUser();

  useEffect(() => {
    if (user?.role != "admin") {
      router.push('/');
    }
  }
  , []);

  const [course, setCourse] = useState<Course>({
    _id: "",
    title: "",
    description: "",
    duration: 0,
    instructor: "",
  });

  useEffect(() => {
    if (slug && slug !== "add") {
      const fetchCourse = async () => {
        try {
          const response = await apiRequest.get(`/courses/${slug}`);
          if (response.status === 200) {
            setCourse(response.data);
          } else {
            console.error("Failed to fetch course data");
          }
        } catch (error) {
          console.error("An error occurred while fetching the course:", error);
        }
      };
      fetchCourse();
    }
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isUpdating = slug && slug !== "add";
    const method = isUpdating ? "put" : "post";
    const url = isUpdating ? `/admin/courses/${slug}` : "/admin/courses";

    try {
      const response = await apiRequest[method](url, course);
      if (response.status === 200 || response.status === 201) {
        console.log(isUpdating ? "Course updated successfully" : "Course added successfully");
       if(isUpdating){
        router.push(`/course/${slug}`);
       }
        else{
          router.push('/');
        }
      } else {
        console.error("Failed to submit course");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col w-full p-5 items-center justify-center">
      <h1 className='text-4xl font-bold py-5'>{slug === "add" ? "Add Course" : "Update Course"}</h1>
      <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5 items-center justify-center w-11/12'>
        <div className='flex flex-row gap-10 items-center justify-between w-full'>
          <label htmlFor="title" className='text-2xl font-semibold'>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
            className='border-2 border-gray-300 rounded-lg p-2 w-4/5'
            placeholder='Enter course title'
          />
        </div>
        <div className='flex flex-row gap-10 items-center justify-between w-full'>
          <label htmlFor="description" className='text-2xl font-semibold'>Description</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            rows={5}
            className='border-2 border-gray-300 rounded-lg p-2 w-4/5'
            placeholder='Enter course description'
          />
        </div>
        <div className='flex flex-row gap-10 items-center justify-between w-full'>
          <label htmlFor="duration" className='text-2xl font-semibold'>Duration (in hrs)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            className='border-2 border-gray-300 rounded-lg p-2 w-4/5'
          />
        </div>
        <div className='flex flex-row gap-10 items-center justify-between w-full'>
          <label htmlFor="instructor" className='text-2xl font-semibold'>Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className='border-2 border-gray-300 rounded-lg p-2 w-4/5'
            placeholder='Enter course instructor'
          />
        </div>
        <button type="submit" className='w-1/2 bg-green-600 rounded-full h-[50px] mt-10 text-white'>{slug === "add" ? "Add Course" : "Update Course"}</button>
      </form>
    </div>
  );
};

export default AddOrUpdateCourse;
