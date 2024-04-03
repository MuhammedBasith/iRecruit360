'use client'

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Header from "./header"
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function AddCandidates() {
  const router = useRouter();

  const [questions, setQuestions] = useState('');

  const handleInputChange = (e: any) => {
    setQuestions(e.target.value); 
  };

  const saveQuestions = () => {
    localStorage.removeItem('questions');
    localStorage.setItem('questions', questions);
    router.push('/admin/add-candidates')
  }
  
  return (
    <>
    <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
    <div className="flex items-center min-h-[600px] px-4 py-6 sm:px-6 sm:py-12">
      <div className="mx-auto space-y-6 w-full max-w-3xl mt-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Add Questions For Round Two</h1>
        </div>
        <div className="space-y-2">
          <Label htmlFor="candidates">Questions</Label>
          <Textarea className="min-h-[200px]" id="candidates" placeholder="Enter each questions seperated by commas." style={{ backgroundColor: 'white' }} value={questions} onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out" disabled={!questions.trim()} onClick={saveQuestions}>Submit</Button>
        </div>
      </div>
    </div>
    </>
  )
}