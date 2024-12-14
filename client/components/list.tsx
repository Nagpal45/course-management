import Link from "next/link";
import Course from "@/types";

interface ListProps {
  courses: Course[];
}

const List: React.FC<ListProps> = ({ courses }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 flex-wrap mt-6">
      {courses &&
        courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col border-2 rounded-lg p-3 justify-between w-full"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p>
                  {course.description && course.description.length > 150
                    ? course.description.slice(0, 150) + "..."
                    : course.description}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                  <Link href={`/course/${course._id}`}>View</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
