"use client";

import Image from "next/image";
import Big404 from "../../../public/assets/images/quoio_full.png";
import Navbar from "../../components/empty_navbar"; // Adjust the path if necessary
import { useState } from "react";
import Link from "next/link";
import "../globals.css";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center bg-[#ffffff] min-h-screen -mt-30">
        <div className="flex flex-row items-center justify-center w-full p-6 -mt-30 gap-x-24">
          {" "}
          {/* Adjusted margin-top */}
          <div className="flex-shrink-0">
            <Image
              src={Big404}
              alt="404 Image"
              width={550}
              height={550}
              className="h-auto -mt-40 mr-50"
            />
          </div>
          <div className="flex flex-col items-start text-left ml-50 -mt-48">
            <h1 className="text-8xl font-bold text-black dark:text-black">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-zinc-900">
                Oops!
              </span>
            </h1>
            <p className="text-xl text-black font-semibold mt-6 mb-6">
              {" "}
              {/* Adjusted margins */}
              We couldn&apos;t find the page you were looking for :c
            </p>
            <div className="mt-4">
              <Link href="/">
                <button className="bg-[#ff6941] hover:bg-[#e55d39] text-md text-white px-5 py-4 font-bold rounded-lg text-lg">
                  ← &nbsp; Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
