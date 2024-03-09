import { Button } from "@/components/ui/button"
import Header from "./header"

export default function ShowInterviewTable() {
  return (
    <div>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
      <div className="flex items-center justify-center min-h-[600px] p-6">
        <div className="w-full max-w-screen-lg space-y-4 border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            <h1 className="text-3xl font-bold">Interviews</h1>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-between space-y-2">
                <div className="font-semibold">College of Engineering Thalassery</div>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Reschedule</Button>
                <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">View Results</Button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-between space-y-2">
                <div className="font-semibold">Science Institute</div>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Reschedule</Button>
                <Button size="sm" className=" bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">View Results</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
