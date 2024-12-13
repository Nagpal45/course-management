import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";
import Course from "@/types";

const AddOrUpdateCourse = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    duration: 0,
    instructor: "",
  });

  useEffect(() => {
    if (slug && slug !== "add") {
      const fetchCourse = async () => {
        try {
          const response = await apiRequest.get(`/admin/courses/${slug}`);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await apiRequest[method](url, { course });
      if (response.status === 200 || response.status === 201) {
        console.log(isUpdating ? "Course updated successfully" : "Course added successfully");
        router.push("/");
      } else {
        console.error("Failed to submit course");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container">
      <h1>{slug === "add" ? "Add Course" : "Update Course"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={course.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{slug === "add" ? "Add Course" : "Update Course"}</button>
      </form>
    </div>
  );
};

export default AddOrUpdateCourse;
