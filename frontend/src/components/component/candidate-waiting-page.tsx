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
    setCandidateName(storedCandidateName);
    setInterviewName(storedInterviewName);
    setInterviewDateTime(storedInterviewDateTime);

    // Calculate the time difference in milliseconds
    const interviewTime = new Date(storedInterviewDateTime).getTime();
    const currentTime = Date.now();
    const timeDifference = interviewTime - currentTime;

    // Enable the button 2 minutes (120,000 milliseconds) before the interview time
    if (timeDifference > 0 && timeDifference <= 120000) {
      setIsButtonEnabled(true);
    }

    // Log the fetched interview details (for debugging)
    console.log('Interview Name:', storedInterviewName);
    console.log('Interview Date and Time:', storedInterviewDateTime);
  }, []); // Run this effect only once on component mount

  const handleStartTest = () => {
    router.push('/candidate/instructions')
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
              <p className="text-sm text-gray-600 font-bold">You have an interview scheduled for:</p>
              <p className="text-sm text-gray-600 font-bold"><b>{interviewName}</b></p>
              <p className="text-sm text-gray-600 font-bold"><b>{interviewDateTime}</b></p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-center gap-4 pt-2">
            <Button
              size="sm"
              className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
              // disabled={!isButtonEnabled} // TODO: Keep this line for production.
              disabled={false}
              onClick={handleStartTest}
            >
              Start Test
            </Button>
            <p className="text-xs text-center text-gray-600">
              You will be able to access the test 2 minutes before the start time.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
