'use client'

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "./header";
import { useRouter } from 'next/navigation';


export default function ScheduleInterview() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    checkButtonState(e.target.value, time);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    checkButtonState(date, e.target.value);
  };

  const checkButtonState = (selectedDate, selectedTime) => {
    setIsButtonActive(selectedDate && selectedTime);
  };

  const handleSendEmail = () => {
    const dateTime = date + ' ' + time; // Combine date and time
    localStorage.removeItem('interviewDateTime');
    localStorage.setItem('interviewDateTime', dateTime);
    router.push('/admin/progress')

  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
      <div className="flex justify-center items-center flex-grow" style={{ marginTop: "-5rem" }}>
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-center">Schedule Interview</h1>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Enter the date and time you'd like to schedule your interview and click the "Send Email" button to confirm.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" style={{ backgroundColor: 'white' }} value={date} onChange={handleDateChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" style={{ backgroundColor: 'white' }} value={time} onChange={handleTimeChange} />
              </div>
            </div>
            <Button className={`w-full ${isButtonActive ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`} onClick={handleSendEmail} disabled={!isButtonActive}>Send Email</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
