"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../../../../utils/supabase/client";
import BlurIn from "@/components/ui/blur-in";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface UserProfile {
  user_id: string;
  user_name: string;
  language: string;
}

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoaded && isSignedIn && user) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user profile:", error);
        } else if (data) {
          setProfile(data);
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLoaded, isSignedIn, user]);

  if (loading) {
    return (
      <main className="flex flex-col items-center mt-36 min-h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Loading...</h1>
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col items-center mt-16 min-h-screen text-center">
        <BlurIn
          word={`welcome back, ${profile?.user_name || ""}`}
          className="text-6xl font-extrabold text-gray-800 mb-4"
          duration={1}
        />

        <h6 className="font-semibold mb-16">What shall we learn today?</h6>

        <Card className="w-full max-w-md mx-auto flex flex-col items-center text-center">
          <CardHeader className="w-full">
            <CardTitle className="text-xl font-bold text-primary">
              Next Lesson
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full px-6 py-4">
            <h2 className="text-2xl font-bold mb-4">business greetings</h2>
            <p className="text-base text-muted-foreground">
              Learn basic greetings in German for business
            </p>
          </CardContent>
          <CardFooter className="w-1/2 px-6 pb-6 pt-2 flex justify-center">
            <Link href="/lesson">
              <Button
                className="w-full text-lg font-bold bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl py-4" // Adjusted py value
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                  transform: "translateY(-2px)",
                }}
              >
                Let's Go!
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
