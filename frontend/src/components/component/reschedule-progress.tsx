'use client'

import { useEffect, useLayoutEffect, useState } from "react";
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
        interviewDateTime: localStorage.getItem('interviewDateTime')
      };
  
      const response = await fetch('http://localhost:8000/api/rescheduleInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interviewData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Set progress to 100
      setProgress(100);
      setProgressText('Emails sent successfully')
      setIsProgressBarComplete(true);
      localStorage.removeItem('interviewName') //TODO
      
      // Wait for 3 seconds before redirecting to home page
      setTimeout(() => {
        router.push('/admin/show-interviews');
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
    console.log('inside')      
    handleSendEmail()
  }, [])

  useEffect(() => {
    // Execute handleSendEmail when component mounts
    
    // Simulate progress updates
    const progressUpdates = [
      { text: "Created interview: InterviewName", value: 25 },
      { text: "Questions saved", value: 50 },
      { text: "Candidates names added", value: 75 },
      { text: "Starting to send emails", value: 80 } // Adjusted progress value
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
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Progress</h1>
      <Progress value={progress} className="w-3/5" />
      <p className="text-center mt-4">{progressText}</p>
      {isProgressBarComplete && <p className="text-green-600 mt-2">Process complete!</p>}
    </div>

  );
}
