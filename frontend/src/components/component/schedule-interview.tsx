import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from "./header"

export default function ScheduleInterview() {
  return (

    <div className="min-h-screen flex flex-col">
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
      <div className="flex justify-center items-center flex-grow" style={{ marginTop: "-5rem" }}> {/* Increased negative margin-top */}
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
                <Input id="date" type="date" style={{ backgroundColor: 'white' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" style={{ backgroundColor: 'white' }} />
              </div>
            </div>
            <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Send Email</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
