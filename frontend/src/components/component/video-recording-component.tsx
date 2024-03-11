'use client'
import { Button } from "@/components/ui/button"
import Header from "@/components/component/header";
import WebcamVideo from "./web-cam-component";
import MyStepper from "./stepper"


export default function VideoRecordingComponent() {
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />
      <div className="mx-auto max-w-3xl space-y-8" style={{marginTop: '70px'}}>
        <MyStepper activeStep={1}/>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto max-w-3xl space-y-8" style={{marginTop: '90px'}}>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-bold">Your Question:</h1>
          <p className="text-xl text-gray-600 max-w-lg text-center" style={{marginBottom: '20px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </p>
        </div>
        <div className="w-full max-w-md h-[300px] bg-gray-200 rounded-lg flex items-center justify-center shadow-lg" style={{borderColor: 'black'}}>
          <WebcamVideo/>
        </div>
        <div className="flex justify-center space-x-4">
          <Button className="bg-red-500 text-white">Record</Button>
          {/* <Button className="bg-gray-500 text-white">Stop</Button> */}
          <Button className="bg-green-500 text-white">Submit</Button>
        </div>
      </div>
    </>
  )
}
