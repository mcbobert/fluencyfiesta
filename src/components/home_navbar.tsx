"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/images/quoio.png";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SignOutButton } from "@clerk/nextjs";

const AppNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Left-aligned Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="h-auto w-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Centered Navigation Menu */}
      <div className="flex space-x-8">
        <Link href="/home" className="text-gray-700 text-lg hover:text-black">
          Learn
        </Link>
        <Link href="/feed" className="text-gray-700 text-lg hover:text-black">
          Feed
        </Link>
        <Link href="#others" className="text-gray-700 text-lg hover:text-black">
          Others
        </Link>
      </div>

      {/* Right-aligned User Dropdown Menu */}
      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-1 rounded-full">
              <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <p className="text-md font-semibold">name</p>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-lg shadow-lg border border-gray-200 bg-white"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/trainer_profile"
                className="block w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md"
              >
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="block w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span className="block w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md cursor-pointer">
                    Log Out
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the home screen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-md">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-500 text-white rounded-md">
                      <SignOutButton>Log Out</SignOutButton>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AppNavbar;
