import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "./header"

export default function CandidateWaitingPage() {
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />
      <div style={{ marginTop: '200px' }}>
      <Card className="max-w-sm mx-auto" style={{ backgroundColor: 'white', padding: '25px', paddingBottom: '10px'}}>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-black" style={{marginBottom: '20px'}}>Hello, Arun!</h1>
            <p className="text-sm text-gray-600 font-bold">You have an interview scheduled for <span><br />22-05-2024 at 7:00 PM</span></p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-4 pt-4">
          <Button size="sm" className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Start Test</Button>
          <p className="text-xs text-center text-gray-600">You will be able to access the test 2 minutes before the start time.</p>

        </CardFooter>
      </Card>



      </div>
    </>
  )
}
