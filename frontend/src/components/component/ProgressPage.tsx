'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import { useToast } from '@chakra-ui/react'


export default function ProgressPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [isProgressBarComplete, setIsProgressBarComplete] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const toast = useToast()


  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      const interviewData = {
        interviewName: localStorage.getItem('interviewName'),
        questions: localStorage.getItem('questions'),
        candidateData: localStorage.getItem('candidateData'),
        interviewDateTime: localStorage.getItem('interviewDateTime')
      };
  
      const response = await fetch('http://localhost:8000/api/createInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interviewData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      // Wait for response from backend
      const responseData = await response.json();
  
      // Upon receiving response indicating emails have been sent successfully
      console.log('Response from backend:', responseData);

      // Set progress to 100
      setProgress(100);
      setIsProgressBarComplete(true);

      
      // Wait for 3 seconds before redirecting to home page
      setTimeout(() => {
        router.push('/admin/admin-home');
        toast({
          title: 'Action Completed Successfully',
          description: "The action has been successfully completed.",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  useEffect(() => {
    // Execute handleSendEmail when component mounts
    handleSendEmail();
    
    // Simulate progress updates
    const progressUpdates = [
      { text: "Created interview: InterviewName", value: 25 },
      { text: "Questions saved", value: 50 },
      { text: "Candidates names added", value: 75 },
      { text: "Starting to send emails", value: 80 } // Adjusted progress value
      // Add more progress updates as needed
    ];

    const updateProgress = () => {
      progressUpdates.forEach(({ text, value }, index) => {
        setTimeout(() => {
          setProgressText(text);
          setProgress(value);
        }, index * 2000); // Simulate a delay between each progress update. 
      });
    };

    updateProgress();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-4">Progress</h1>
      <Progress value={progress} className="w-[60%]" />
      <p className="text-center mt-4">{progressText}</p>
      {isProgressBarComplete && <p className="text-center mt-2 text-green-600">Process complete!</p>}
    </div>
  );
}
