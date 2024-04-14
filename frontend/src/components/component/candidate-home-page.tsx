'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Header from './header';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';


export default function CandidateHomePage() {
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [clicked, setClicked] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleCodeChange = (index, value) => {
    const updatedDigits = [...codeDigits];
    updatedDigits[index] = value;
    setCodeDigits(updatedDigits);

    // Enable submit button when all code digits are entered
    const allDigitsEntered = updatedDigits.every(digit => digit !== '');
    setClicked(allDigitsEntered);
  };

  const handleSubmit = async () => {
    try {
      console.log(codeDigits)
      setClicked(false)
      const emailData = localStorage.getItem('emailForInterviewData')
        let enteredCode = codeDigits.join(''); // Concatenate digits into a string
        console.log(enteredCode)
        if (enteredCode.length === 7){
          enteredCode = enteredCode.slice(0, 5) + enteredCode.slice(6);
          console.log(enteredCode);
        }
      const response = await axios.post('http://localhost:8000/api/verifyInterviewCode', {
        code: enteredCode,
        email: emailData
      });

      if (response.data.success) {
        console.log(response.data)
        // Extract interview details from the response
        const interviewName = response.data.interviews[0].interview_name;
        const interviewDateTime = response.data.interviews[0].interview_datetime;
        const candidate_name_data = response.data.interviews[0].candidate_name;
      
        // Store interview details in local storage
        localStorage.setItem('interviewName', interviewName);
        localStorage.setItem('candidate_name', candidate_name_data);
        localStorage.setItem('interviewDateTime', interviewDateTime);
      
        router.push('/candidate/interview-details');
      } else {
        // Display error toast for incorrect code
        setClicked(true)
        toast({
          title: 'Invalid Code',
          description: 'Please enter a valid interview code.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

        // Reset code digits
        setCodeDigits(['', '', '', '', '', '']);
        setClicked(false);
      }
    } catch (error) {
      setClicked(true)
      toast({
        title: 'Network Error',
        description: 'Please Ensure a Proper Internet Connection.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error verifying interview code:', error);
      // Handle error
    }
  };

  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />
      <div className="flex flex-col items-center min-h-[600px] px-4 py-6 sm:px-6 sm:py-12 mt-20 flex-grow mb-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold" style={{ marginTop: '40px' }}>Your Interview</h1>
          <p className="text-gray-500 dark:text-gray-400" style={{ marginBottom: '30px' }}>Enter the code provided by your interviewer</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <Card className="rounded-xl p-6" style={{ backgroundColor: 'white' }}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter Your Code</Label>
                <div className="flex justify-center mb-4">
                  {/* Render PinInput with PinInputFields for each digit */}
                  <PinInput size="lg" otp>
                    {codeDigits.map((digit, index) => (
                      <PinInputField
                        key={index}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        style={{ width: '2rem', textAlign: 'center', marginRight: '0.5rem', color: 'black', borderColor: 'black' }}
                      />
                    ))}
                  </PinInput>
                </div>
              </div>
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                disabled={!clicked} // Disable button when not all digits are entered
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex-grow"></div> {/* Using flex-grow to push content to the center */}
      </div>
    </>
  );
}
