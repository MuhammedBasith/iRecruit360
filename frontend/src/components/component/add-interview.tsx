'use client'

import Link from "next/link"
import Header from "./header"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from 'next/navigation';


export default function AddInterview() {

  const router = useRouter();

  const [interviewName, setInterviewName] = useState('');

  const handleInputChange = (e: any) => {
    setInterviewName(e.target.value); 
  };

  const saveInterviewName = () => {
    localStorage.removeItem('interviewName');
    localStorage.setItem('interviewName', interviewName);
    router.push('/admin/add-questions')
  }


  return (
    <div>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
      <div className="flex items-center min-h-[600px] px-4 py-6 sm:px-6 sm:py-12 mt-20">
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg p-0">
            <CardHeader className="pb-0 mb-8">
              <CardTitle className="text-center">Add Interview</CardTitle>
              <CardDescription className="text-center">Enter the name of the interview to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="form-label" htmlFor="interview-name">
                  Interview Name
                </Label>
                <Input id="interview-name" placeholder="Enter the name of the interview" className="bg-white text-gray-800 placeholder-gray-400 border border-gray-200 rounded-lg p-3" style={{ backgroundColor: 'white' }} value={interviewName} onChange={handleInputChange}/>
              </div>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out" disabled={!interviewName.trim()} onClick={saveInterviewName}>Create Interview</Button>
            </CardContent>
          </div>
        </main>
      </div>
    </div>
  )
}


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}
