'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Header from "@/components/component/header";
import MyStepper from "./stepper";
import { useRouter } from 'next/navigation';
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


export default function VideoRecordingComponent() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [question, setQuestion] = useState("");
  const [clicked, setClicked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const router = useRouter();

  useEffect(() => {
    // Fetch question data from the Flask backend
    const fetchQuestion = async () => {
      try {
        const interviewName = localStorage.getItem("interviewName");
        const emailForInterviewData = localStorage.getItem("emailForInterviewData");

        const response = await fetch("http://127.0.0.1:8000/api/getQuestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interviewName,
            emailForInterviewData,
          }),
        });
        if (response.ok) {
          const questionData = await response.json();
          setQuestion(questionData.question);
        } else {
          console.error("Failed to fetch question");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    // Call the fetchQuestion function when the component mounts
    fetchQuestion();
  }, []);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    const webcamStream = webcamRef.current.video.srcObject;
    if (webcamStream) {
      mediaRecorderRef.current = new MediaRecorder(webcamStream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    setClicked(true)
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const interviewName = localStorage.getItem("interviewName");
      const emailForInterviewData = localStorage.getItem("emailForInterviewData");

      const formData = new FormData();
      formData.append("video", blob);
      formData.append("interviewName", interviewName);
      formData.append("question", question);
      formData.append("email", emailForInterviewData);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/submitVideo", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Video submitted successfully");
        } else {
          setClicked(false)
          console.error("Failed to submit video");
        }
      } catch (error) {
        setClicked(false)
        console.error("Error submitting video:", error);
      }

      setRecordedChunks([]);
      router.push('/candidate/round-three')
    }
  }, [recordedChunks]);

  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <>
      <Header
        showSignUpButton={false}
        showAdminButton={false}
        showSignInButton={false}
        isLoggedin={false}
        isCandidateLoggedin={true}
      />
      <div className="mx-auto max-w-3xl space-y-8" style={{ marginTop: "70px" }}>
        <MyStepper activeStep={1} />
      </div>
      <div className="flex flex-col items-center justify-center mx-auto max-w-3xl space-y-8" style={{ marginTop: "90px" }}>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-bold">Your Question:</h1>
          <p className="text-xl text-gray-600 max-w-lg text-center" style={{ marginBottom: "20px" }}>
            {question}
          </p>
        </div>
        <div className="w-full max-w-md h-[300px] bg-gray-200 rounded-lg flex items-center justify-center shadow-lg" style={{ borderColor: "black" }}>
          <div className="Container">
            <Webcam
              audio={true}
              muted={true}
              mirrored={true}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              onUserMedia={(mediaStream) => {
                if (mediaStream && webcamRef.current) {
                  webcamRef.current.video.srcObject = mediaStream;
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          {capturing ? (
            <Button className="bg-gray-500 text-white" onClick={handleStopCaptureClick}>
              Stop
            </Button>
          ) : (
            <Button className="bg-red-500 text-white" onClick={handleStartCaptureClick}>
              Record
            </Button>
          )}
          {recordedChunks.length > 0 && (
            <Button className="bg-green-500 text-white" onClick={onOpen} >
              Submit
            </Button>
          )}
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
              <Button className="bg-black text-white hover:bg-gray-800" onClick={handleDownload} disabled={clicked}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
