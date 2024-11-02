"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../../../../utils/supabase/client";
import BlurIn from "@/components/ui/blur-in";

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
          word={`w  elcome back, ${profile?.user_name || ""}!`}
          className="text-6xl font-extrabold text-gray-800 mb-4"
          duration={1}
        />

        <h6 className="font-semibold">What shall we learn today?</h6>
      </main>
    </>
  );
}
