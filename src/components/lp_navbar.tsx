"use client";

import React from "react";
import Image from "next/image";
import logo from "../../public/assets/images/fluencyfiesta.png";
import { Button } from "./ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      {/* Empty div to push the logo to the center */}
      <div className="w-1/3"></div>

      {/* Centered Logo */}
      <div className="w-1/3 flex justify-center">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={50}
          className="h-auto w-auto"
        />
      </div>

      {/* Login Button on the right */}
      <div className="w-1/3 flex justify-end">
        <Button className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold px-4 py-2 rounded-md text-lg">
          <SignInButton>
            <span>Log In</span>
          </SignInButton>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
