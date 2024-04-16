'use client'

import React, { useState, useRef,  useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Header from './header';
import { useRouter } from 'next/navigation';
import MyStepper from './stepper';
import { useDisclosure } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton
} from '@chakra-ui/react';

const InterviewComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [clicked, setClicked] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedEmail = localStorage.getItem('emailForInterviewData');
        const storedInterviewName = localStorage.getItem('interviewName');

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: storedEmail,
            interviewName: storedInterviewName
          })
        };

        const response = await fetch('http://localhost:8000/api/getQuestions', requestOptions);
        if (response.ok) {
          const data = await response.json();
          const questionsWithIds = data.questions.map((question, index) => ({
            id: index + 1,
            text: question
          }));
          setQuestions(questionsWithIds);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleFinalSubmit = async () => {
    setClicked(true)
    try {
      const formData = {
        questions: questions.map((question) => question.text),
        email: localStorage.getItem('emailForInterviewData'),
        interviewName: localStorage.getItem('interviewName'),
        answers: answers,
      };

      const allQuestionsAnswered = questions.every((question) => {
        return answers[question.id] !== undefined && answers[question.id] !== '';
      });

      if (allQuestionsAnswered) {
        const response = await fetch('http://localhost:8000/api/roundThreeSubmitAnswers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Answers submitted successfully');
          setAnswers({});
          router.push('/candidate/finishInterview')
        } else {
          setClicked(true)
          console.error('Failed to submit answers');
        }
      } else {
        setClicked(true)
        console.log('Please answer all questions before submitting.');
      }
    } catch (error) {
      setClicked(true)
      console.error('Error submitting answers:', error);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const allQuestionsAnswered = questions.every((question) => {
    return answers[question.id] !== undefined && answers[question.id] !== '';
  });

  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />
      <div className="mx-auto max-w-3xl space-y-8" style={{ marginTop: '70px' }}>
        <MyStepper activeStep={2}/>
      </div>
      <div className="flex flex-col items-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
        {questions.length > 0 && (
          <Card className="w-full max-w-2xl" style={{ backgroundColor: '#FFFFFF', borderColor: '#D1D5DB', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '8px', padding: '24px' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333333' }}>Resume-Based Questions</CardTitle>
              <CardDescription style={{ fontSize: '1rem', color: '#555555', marginBottom: '17px' }}>Please provide detailed answers for each question below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id} className="w-full" style={{ backgroundColor: 'white', borderColor: '#CCCCCC', borderRadius: '4px', padding: '16px', marginBottom: '16px' }}>
                  <CardHeader>
                    <CardTitle style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#333333' }}>{question.text}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      className="min-h-[100px] w-full"
                      style={{ backgroundColor: 'white', color: 'black' }}
                      placeholder="Enter your answer"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  </CardContent>
                </Card>
              ))}
              <CardFooter className="w-full flex justify-center">
                <Button
                  className={`bg-orange-700 w-full hover:bg-orange-500 ${questions.length === 0 ? 'hidden' : ''}`}
                  onClick={onOpen}
                  disabled={questions.length === 0 || !allQuestionsAnswered}
                >
                  Submit
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        )}

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
            Are you certain you wish to submit your answers and conclude the test?
            </AlertDialogBody>
            <AlertDialogFooter>
            <Button className="hover:bg-gray-200 hover:text-gray-700 border border-gray-700 mr-2" onClick={onClose}>
                No
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" onClick={handleFinalSubmit} disabled={clicked}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default InterviewComponent;
