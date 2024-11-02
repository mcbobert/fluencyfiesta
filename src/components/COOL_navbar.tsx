"use client";

import { useState, useEffect } from "react";
import { Menu, X, BookType } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import logo from "../../public/assets/images/quoio.png";

export default function CollapsibleNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        isSticky ? "top-4" : "top-8"
      }`}
    >
      <nav
        className={`bg-background rounded-full shadow-lg transition-all duration-300 ease-in-out ${
          isSticky ? "px-4 py-2" : "px-8 py-4"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
            isSticky ? "space-x-2" : "space-x-4"
          }`}
        >
          <div className="flex items-center transition-all duration-300 ease-in-out">
            <div className="w-1/3 flex justify-center">
              <img src={logo.src} alt="Logo" width={40} height={40} />
            </div>
            {!isSticky && (
              <div className="hidden md:flex space-x-4 ml-4 transition-opacity duration-300 ease-in-out">
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Documentation
                </a>
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4 transition-all duration-300 ease-in-out">
            <Button
              className={`transition-all bg-gradient-to-br from-pink-500 to-pink-600 duration-300 ease-in-out ${
                isSticky ? "text-sm py-1 px-3" : "px-4 py-2"
              }`}
            >
              <SignInButton>
                <span>Log In</span>
              </SignInButton>
            </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="transition-all duration-300 ease-in-out"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {isOpen && (
          <div
            className="md:hidden mt-4 space-y-2 transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isOpen ? "1000px" : "0",
              opacity: isOpen ? 1 : 0,
              overflow: "hidden",
            }}
          >
            {!isSticky && (
              <>
                <a
                  href="#"
                  className="block text-foreground hover:text-primary transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block text-foreground hover:text-primary transition-colors duration-200"
                >
                  Pricing
                </a>
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-200"
                >
                  Sign in
                </Button>
              </>
            )}
            <Button className="w-full transition-all duration-200 bg-gradient-to-br from-pink-500 to-pink-600">
              Get started free
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
