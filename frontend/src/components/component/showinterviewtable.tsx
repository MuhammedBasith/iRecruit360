'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from './header';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useRouter } from 'next/navigation';


export default function ShowInterviewTable() {
  const [interviews, setInterviews] = useState([]); // State variable to store interview data
  const [firstButtonClicked, setFirstButtonClicked] = useState(false)
  const [secondButtonClicked, setSecondButtonClicked] = useState(false)
  const router = useRouter();

  useEffect(() => {
    // Function to fetch interview data from the backend when the component mounts
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getInterviewNames'); // Send GET request to the backend endpoint
        console.log(response.data.interviews)
        setInterviews(response.data.interviews); // Update state with fetched interview data
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews(); // Call the fetchInterviews function
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const handleReschedule = (interviewName: any) => {
    localStorage.removeItem('interviewName')
    localStorage.setItem('interviewName', interviewName)
    router.push('/admin/reschedule-interview');
  }

  const handleViewResults = (interviewName: any) => {
    localStorage.removeItem('interviewName')
    localStorage.setItem('interviewName', interviewName)
    router.push('/admin/view-results');
  }

  return (
    <div>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
      <div className="flex items-center justify-center min-h-[600px] p-6">
        <div className="w-full max-w-screen-lg space-y-4 border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            <h1 className="text-3xl font-bold">Interviews</h1>
          </div>
          <div className="p-4">
            {interviews.map((interview, index) => (  // Add unique "key" prop here
            <div className='mb-6'>
              <div className="grid grid-cols-2 gap-4" key={index}>
                <div className="flex flex-col justify-between space-y-2">
                  <div className="font-semibold">{interview}</div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out" disabled={firstButtonClicked} onClick={() =>{
                    setFirstButtonClicked(true)
                    handleReschedule(interview)
                    }}>
                      Reschedule</Button>
                  <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out" disabled={secondButtonClicked} onClick={() => {
                    setSecondButtonClicked(true)
                    handleViewResults(interview)}}>View Results</Button>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
