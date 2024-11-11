"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Importing the arrow icon
import logo from "../../public/assets/images/quoio.png";

const AppNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center p-4 mt-2 bg-transparent z-50">
      <Link
        href="/home"
        className="absolute top-1/2 left-6 transform -translate-y-1/2 flex items-center"
      >
        <button className="flex items-center px-3 py-1.5 h-10 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition duration-200">
          <ArrowLeft className="mr-1 h-4 w-4" /> {/* Smaller icon */}
          Back to Home
        </button>
      </Link>
      <div className="flex justify-center">
        <Link href="/home" className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="h-auto w-auto"
          />
        </Link>
      </div>
    </nav>
  );
};

export default AppNavbar;
