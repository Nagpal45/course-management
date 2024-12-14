"use client";
import apiRequest from "@/lib/apiRequest";
import { useUser } from "@/lib/authContext";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  const {user, setUser} = useUser();
  
  const handleLogout = async () => {
    await apiRequest.get("/auth/logout");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="flex flex-row h-[60px] w-full bg-gray-800 items-center justify-between px-10 text-white">
      <Link className="text-lg" href="/">
        Academically
      </Link>
      {user ? (
        <div className="flex flex-row text-md items-center">
        <Link href="/" className="mr-10">
          Courses
        </Link>
        {user.role == "admin" ? (
          <Link href="/createUpdate/add">Add Course</Link>
        ) : (
          <Link href="/userCourses">My courses</Link>
        )}
        <Image
          src="/user.svg"
          alt=" "
          width={35}
          height={35}
          className="rounded-full bg-gray-300 ml-10 mr-3"
        />
        <p>Hey {user.username}!</p>
        <button className="ml-10 text-red-400" onClick={handleLogout}>
          Logout
        </button>
      </div>
      ) : (
        <div className="flex flex-row text-md items-center">
          <Link href="/login" className="mr-10">
            Login
          </Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
