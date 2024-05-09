'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "./header";
import { useRouter } from 'next/navigation';


export default function CandidateWaitingPage() {
  const router = useRouter();
  const [candidateName, setCandidateName] = useState('');
  const [interviewName, setInterviewName] = useState('');
  const [interviewDateTime, setInterviewDateTime] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Fetch interview details from local storage
    const storedCandidateName = localStorage.getItem('candidate_name');
    const storedInterviewName = localStorage.getItem('interviewName');
    const storedInterviewDateTime = localStorage.getItem('interviewDateTime');

    // Update state with fetched data
    setCandidateName(storedCandidateName || '');
    setInterviewName(storedInterviewName || '');
    setInterviewDateTime(storedInterviewDateTime || '');

  }, []); // Run this effect only once on component mount

  const handleRouteHome = () => {
    router.push('/')
  }

  return (
    <>
      <Header
        showSignUpButton={false}
        showAdminButton={false}
        showSignInButton={false}
        isLoggedin={false}
        isCandidateLoggedin={true}
      />
      <div style={{ marginTop: '200px' }}>
        <Card className="max-w-sm mx-auto" style={{ backgroundColor: 'white', padding: '25px', paddingBottom: '10px' }}>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-black mb-4">Hello, {candidateName}!</h1>
              <p className="text-sm text-gray-600 font-bold">Thank you for attending the interview for the {interviewName} position on {interviewDateTime}</p>
              <p className="text-sm text-gray-600 font-bold">The interview process has been completed from your end. The hiring team will review your application and interview, and you will be notified about the next steps in the coming days.
We appreciate your interest in the role and your patience during the evaluation process.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-center gap-4 pt-2">
            <Button
              size="sm"
              className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
              onClick={handleRouteHome}
            >
              Home
            </Button>

          </CardFooter>
        </Card>
      </div>
    </>
  );
}
