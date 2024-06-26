'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Header from "./header"
import MyStepper from "./stepper"
import TransitionExample from "./confirmation-alert"
// import { Container, Button as MyButton } from "@mui/material/";
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@chakra-ui/react';
import { QuestionCard } from "../component/index";
import questions from '../../../data/data';
import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
  } from '@chakra-ui/react';


export function RoundOneForm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [responses, setResponses] = useState([]);
  const [personalityResponses, setPersonalityResponses] = useState(new Array(50).fill(0));
  const [dob, setDob] = useState('');
  const [firstName, setfirstName] = useState('');
  const [clicked, setClicked] = useState(false);
  const [lastName, setlastName] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [resumeFile, setResumeFile] = useState(null);


  const handlePersonalityResponseChange = (questionNo, value) => {
    const updatedResponses = [...personalityResponses];
    updatedResponses[questionNo - 1] = value; // questionNo is 1-based index, so use (questionNo - 1) for 0-based array index
    setPersonalityResponses(updatedResponses);
    console.log(personalityResponses)
  };

  const getSelectedValue = (questionNo) => {
    const response = personalityResponses.find((response) => response.questionNo === questionNo);
    return response ? response.value : undefined;
  };
  
  


  const handleYesClick = async () => {
    try {
      setClicked(true)
      const userEmail = localStorage.getItem('emailForInterviewData')
      const interviewName = localStorage.getItem('interviewName')
      const formData = new FormData();
      formData.append('personalityResponses', JSON.stringify(personalityResponses));
      formData.append('email', userEmail || email);
      formData.append('dob', dob);
      formData.append('interviewName', interviewName);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('gender', gender);
      formData.append('twitterUrl', 'test');
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const response = await fetch('http://localhost:8000/api/submitCandidateData', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        router.push('/candidate/round-two');
      } else {
        setClicked(false)
        console.error('Failed to submit candidate data to the backend');
      }
    } catch (error) {
      setClicked(false)
      console.error('Error occurred while submitting candidate data to the backend:', error);
    }
  };

  const handleFormChange = (data) => {
    // Remove existing response with the same number (no)
    console.log(responses)
    const updatedResponses = responses.filter((response) => response.no !== data.no);

    // Add new response to the updatedResponses array
    updatedResponses.push(data);
    setResponses(updatedResponses);
  };
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />

      <div className="mx-auto max-w-3xl space-y-8" style={{marginTop: '70px'}}>
        <MyStepper activeStep={0}/>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Full Name</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" onChange={(e) => setfirstName(e.target.value)} value={firstName} placeholder="Enter your first name" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" onChange={(e) => setlastName(e.target.value)} value={lastName} placeholder="Enter your last name" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MailIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Email</h2>
            </div>
            <Input id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" required type="email" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }} />
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Gender</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Choose your gender</Label>
              <select id="gender" onChange={(e) => setGender(e.target.value)} value={gender} className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white' }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="binary">Binary</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Date of Birth</h2>
            </div>
            <Input id="dob" onChange={(e) => setDob(e.target.value)} value={dob} type="date" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }}/>
          </div>
        </div>
        {/* <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <TwitterIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Twitter Profile URL</h2>
            </div>
            <Input id="twitter" onChange={(e) => setTwitterUrl(e.target.value)} value={twitterUrl} placeholder="https://twitter.com/yourusername" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }}/>
          </div>
        </div> */}
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FileIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Upload Resume</h2>
            </div>
            <Input onChange={(e) => setResumeFile(e.target.files[0])} accept=".jpg" id="resume" type="file" />
          </div>
        </div>


      <Card>
        <CardHeader>
          <CardTitle>Personality Test</CardTitle>
          <CardDescription>Answer each question as accurately as possible.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question) => (
            <div key={question.no} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="font-semibold">{question.no}.</div>
                <div>{question.text}</div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-500">Strongly Disagree</Label>
                <div className="flex items-center space-x-9">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <React.Fragment key={`q${question.no}-${value}`}>
                      <input
                        id={`q${question.no}-${value}`}
                        name={`q${question.no}`}
                        type="radio"
                        value={value}
                        checked={personalityResponses[question.no - 1] === value}
                        onChange={() => handlePersonalityResponseChange(question.no, value)}
                        style={{
                          height: `${getRadioSize(value)}vh`,
                          width: `${getRadioSize(value)}vh`,
                        }}
                      />
                    </React.Fragment>
                  ))}
                </div>
                <Label className="text-xs text-gray-500">Strongly Agree</Label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>





      <div style={{ marginBottom: '100px' }}>
        <Button onClick={onOpen} className="w-full bg-black text-white hover:bg-gray-800">
          Next Round
        </Button>
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Proceed to Next Round?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          Are you sure you want to proceed to the next round?
          </AlertDialogBody>
          <AlertDialogFooter>
          <Button className="hover:bg-gray-200 hover:text-gray-700 border border-gray-700 mr-2" onClick={onClose}>
              No
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800" onClick={handleYesClick} disabled={clicked}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </>
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function FileIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}



function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function getRadioSize(value) {
  if (value === 1 || value === 5) {
    return 5; // Largest size for values 1 and 5
  } else if (value === 2 || value === 4) {
    return 3; // Medium size for values 2 and 4
  } else {
    return 2; // Smallest size for value 3
  }
}