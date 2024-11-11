"use client";

import { useState, useEffect, useRef } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    question: "hallo! willkommen im unternehmen. wie heißen sie?",
    options: ["hallo, ich heiße russell.", "was?", "hallo, ich bin russell."],
    correctAnswer: "hallo, ich heiße russell.",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
];

export default function QuizApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<
    { type: "question" | "answer" | "feedback"; content: string }[]
  >([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    if (currentStep === 2 && messages.length === 0) {
      setMessages([{ type: "question", content: currentQuestion.question }]);
    }
  }, [currentStep, questionIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStart = () => {
    setCurrentStep(2);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);

    setMessages((prev) => [...prev, { type: "answer", content: answer }]);

    const feedback =
      answer === currentQuestion.correctAnswer
        ? "Correct!"
        : "Incorrect. Try again!";
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "feedback", content: feedback }]);

      if (answer === currentQuestion.correctAnswer) {
        setTimeout(() => handleNextQuestion(), 1000);
      }
    }, 500);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setMessages((prev) => [
        ...prev,
        { type: "question", content: questions[questionIndex + 1].question },
      ]);
    } else {
      setCurrentStep(3);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center bg-gray-100 pt-16">
      {currentStep === 1 && (
        <div className="relative h-screen flex flex-col items-center justify-center max-w-md mx-auto px-4">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6 text-center">
            business greetings
          </h1>
          <h3 className="text-lg font-bold text-gray-700 mb-8 text-center">
            You've just started work at a new company, and you're meeting your
            new colleague who's gonna show you around the place.
          </h3>
          <button
            className="absolute bottom-1/4 w-full max-w-xs px-6 py-3 bg-[#ee4699] text-white rounded-lg shadow transition duration-200"
            onClick={handleStart}
          >
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col w-full h-full max-w-2xl mx-auto px-6 overflow-y-auto space-y-6 pt-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "answer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-4 max-w-[80%] ${
                  message.type === "answer"
                    ? "bg-blue-500 text-white"
                    : message.type === "feedback"
                    ? "bg-yellow-100 text-black"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {!selectedAnswer && (
            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-center rounded-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      )}

      {currentStep === 3 && (
        <div className="relative h-screen flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
            Congratulations!
          </h1>
          <p className="text-xl">You completed the quiz.</p>
        </div>
      )}
    </div>
  );
}
