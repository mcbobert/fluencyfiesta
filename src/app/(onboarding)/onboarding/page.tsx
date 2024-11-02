"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import BlurIn from "@/components/ui/blur-in";
import { Input } from "@/components/ui/input";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const languages = [
  { id: 1, label: "chinese" },
  { id: 2, label: "italian" },
  { id: 3, label: "russian" },
  { id: 4, label: "spanish" },
];

const purposes = [
  { id: 1, label: "travel" },
  { id: 2, label: "business" },
  { id: 3, label: "culture" },
  { id: 4, label: "education" },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [selectedPurposes, setSelectedPurposes] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const router = useRouter();

  const togglePurpose = (id: number) => {
    setSelectedPurposes((prev) =>
      prev.includes(id)
        ? prev.filter((purposeId) => purposeId !== id)
        : [...prev, id]
    );
  };

  const toggleLanguage = (id: number) => {
    setSelectedLanguage((prev) => (prev === id ? null : id));
  };

  const getItemStyle = (index: number, isActive: boolean) => {
    const baseTransform = isActive ? "scale(1.1)" : "scale(1)";
    let translateX = "0px";
    if (hoveredIndex !== null && !isActive) {
      const direction = index < hoveredIndex ? -1 : 1;
      const distance = Math.abs(index - hoveredIndex);
      translateX = `${direction * (20 * distance)}px`;
    }
    return {
      transform: `${baseTransform} translateX(${translateX})`,
      zIndex: isActive ? 10 : 1,
    };
  };

  const insertProfileHandler = async () => {
    if (user && selectedLanguage && name) {
      const selectedLanguageLabel = languages.find(
        (lang) => lang.id === selectedLanguage
      )?.label;

      if (!selectedLanguageLabel) {
        console.error("Selected language label is null");
        return;
      }

      console.log("Submitting data:", {
        user_id: user.id,
        user_name: name,
        language: selectedLanguageLabel,
      });

      const { error } = await supabase.from("user_profiles").insert([
        {
          user_id: user.id,
          user_name: name,
          language: selectedLanguageLabel,
        },
      ]);

      if (error) {
        if (
          error.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          toast.error("This profile already exists", {
            action: {
              label: "Go to profile",
              onClick: () => router.push("/home"),
            },
          });
        } else {
          toast.error("An error occurred while inserting the profile.");
        }
        console.error("Error inserting profile:", error);
      } else {
        toast.success("Profile created successfully!");
        router.push("/home");
      }
    } else {
      console.error(
        "Missing required data:",
        "user:",
        user,
        "selectedLanguage:",
        selectedLanguage,
        "name:",
        name
      );
    }
  };

  const handleNext = () => {
    if (step === 5) {
      insertProfileHandler();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z]+$/.test(value);
    setIsValidName(isValid);
    setName(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-6">
        {step === 1 && (
          <div className="relative h-screen flex flex-col items-center justify-center">
            <BlurIn
              word="welcome to quoio"
              className="text-7xl -mt-16 font-bold text-black dark:text-white"
              duration={1}
            />
            <button
              className="absolute bottom-1/4 px-6 py-2 bg-[#ee4699] text-white rounded-lg shadow transition duration-200"
              onClick={handleNext}
            >
              let's get started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 relative h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl -mt-32 mb-16 font-semibold">
              what's your name?
            </h1>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="John Doe"
                className="w-80 h-12 text-lg"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="absolute bottom-1/4 flex space-x-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                onClick={handleBack}
              >
                back
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-lg shadow transition duration-200 text-white",
                  !isValidName
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-[#ee4699] hover:bg-[#d53f88] cursor-pointer"
                )}
                onClick={handleNext}
                disabled={!isValidName}
              >
                next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 relative h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl -mt-32 mb-16 font-semibold">
              what language would you like to learn?
            </h1>
            <div className="flex space-x-4">
              {languages.map((option, index) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer",
                    "hover:z-10",
                    selectedLanguage === option.id ? "rounded-lg scale-105" : ""
                  )}
                  style={getItemStyle(index, selectedLanguage === option.id)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => toggleLanguage(option.id)}
                >
                  <div
                    className={cn(
                      "relative w-24 h-24 mb-2 bg-gray-300 rounded-lg transition-all duration-300",
                      selectedLanguage === option.id
                        ? "shadow-[0_0_15px_rgba(255,105,46,1.2)]"
                        : ""
                    )}
                  />
                  <span className="text-lg font-bold text-gray-700">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-1/4 flex space-x-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                onClick={handleBack}
              >
                back
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-lg shadow transition duration-200 text-white",
                  selectedLanguage === null
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-[#ee4699] hover:bg-[#d53f88] cursor-pointer"
                )}
                onClick={handleNext}
                disabled={selectedLanguage === null}
              >
                next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 relative h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl -mt-32 mb-16 font-semibold">
              what purposes are you learning for?
            </h1>
            <div className="flex space-x-4">
              {purposes.map((option, index) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer",
                    "hover:z-10",
                    selectedPurposes.includes(option.id)
                      ? "rounded-lg scale-105"
                      : ""
                  )}
                  style={getItemStyle(
                    index,
                    selectedPurposes.includes(option.id)
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => togglePurpose(option.id)}
                >
                  <div
                    className={cn(
                      "relative w-24 h-24 mb-2 bg-gray-300 rounded-lg transition-all duration-300",
                      selectedPurposes.includes(option.id)
                        ? "shadow-[0_0_15px_rgba(255,105,46,1.2)]"
                        : ""
                    )}
                  />
                  <span className="text-lg font-bold text-gray-700">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-1/4 flex space-x-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                onClick={handleBack}
              >
                back
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-lg shadow transition duration-200 text-white",
                  selectedPurposes.length === 0
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "bg-[#ee4699] hover:bg-[#d53f88] cursor-pointer"
                )}
                onClick={handleNext}
                disabled={selectedPurposes.length === 0}
              >
                next
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="relative h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">ready to start learning?</h1>
            <div className="absolute bottom-1/4 flex space-x-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                onClick={handleBack}
              >
                back
              </button>
              <button
                className="px-6 py-2 bg-[#ee4699] text-white rounded-lg shadow transition duration-200"
                onClick={insertProfileHandler}
              >
                let's go!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
