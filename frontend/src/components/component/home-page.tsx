"use client";
import Link from "next/link"
import Header from "@/components/component/header";
import { Button } from "@/components/ui/button"
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";


export default function HomePage() {
  const words = [
    {
      text: "Streamlining",
      className: "text-lg sm:text-xl md:text-2xl font-semibold text-center my-4 text-black",
    },
    {
      text: "Your",
      className: "text-lg text-black sm:text-xl md:text-2xl font-semibold text-center my-4",
    },
    {
      text: "Hiring",
      className: "text-lg sm:text-xl md:text-2xl font-semibold text-center my-4 text-black",
    },
    {
      text: "Process",
      className: "text-lg sm:text-xl md:text-2xl font-semibold text-center my-4 text-black",
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Welcome to iRecruit360</h1>
          {/* <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center my-4">
            Streamlining Your Hiring Process
          </h2> */}
          <TypewriterEffectSmooth words={words} />
          <Link href="/login">
            <Button className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Start Interview</Button>
          </Link>
        </div>    
      </main>
    </div>
  );
}