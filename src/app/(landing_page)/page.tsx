"use client";

import React, { useState } from "react";
import Image from "next/image";
import RetroGrid from "@/components/ui/retro-grid";
import { Loader2, ArrowRight } from "lucide-react"; // Update this import path according to where you keep your icons

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* RetroGrid Background */}
      <div className="absolute inset-0 -z-10">
        <RetroGrid />
      </div>
      {/*mt-[-18rem] md:mt-[-12rem] lg:mt-[-18rem]*/}
      <main className="z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl leading-none text-black">
            the straightforward way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
              learn a language
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-black font-semibold mt-8 md:mt-12 lg:mt-16 mb-4 md:mb-6 lg:mb-10">
            placeholder subheader
          </p>
          <div>
            <form className="flex flex-col md:flex-row justify-center items-stretch">
              <input
                type="email"
                placeholder="enter your email"
                className="px-6 py-3 w-full md:w-64 border border-gray-300 rounded-full md:rounded-l-full md:rounded-r-none focus:outline-none focus:ring-2 text-extrabold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="group bg-gradient-to-br from-orange-600 to-amber-500 text-white font-semibold text-xl px-7 py-3 rounded-full md:rounded-l-none md:rounded-r-full hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-4 md:mt-0 w-full md:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    join our waitlist
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
