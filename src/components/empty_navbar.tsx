"use client";

import React from "react";
import Image from "next/image";
import logo from "../../public/assets/images/quoio.png";

const AppNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center p-4 mt-2 bg-transparent z-50">
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="h-auto w-auto"
        />
      </div>
    </nav>
  );
};

export default AppNavbar;
