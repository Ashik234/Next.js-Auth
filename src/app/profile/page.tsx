"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profilepage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <h2 className="text-xl font-bold ">
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}><span className="text-emerald-800">Visit the Profile</span> {data} </Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="px-3 py-2 bg-blue-500 mt-5 rounded text-white"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="px-3 py-2 bg-red-800 mt-5 rounded text-white"
      >
        Get User Details
      </button>
    </div>
  );
}
