import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Header from "./header"
import MyStepper from "./stepper"

export function RoundOneForm() {
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />

      <div className="mx-auto max-w-3xl space-y-8" style={{marginTop: '70px'}}>
      <MyStepper />
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Full Name</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Enter your first name" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Enter your last name" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MailIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Email</h2>
            </div>
            <Input id="email" placeholder="Enter your email" required type="email" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }} />
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Gender</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Choose your gender</Label>
              <select id="gender" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white' }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="binary">Binary</option>
              </select>
            </div>

            <div className="space-y-2">
              <RadioGroup>
                <div />
                <div />
                <div />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Date of Birth</h2>
            </div>
            <Input id="dob" type="date" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }}/>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <TwitterIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Twitter Profile URL</h2>
            </div>
            <Input id="twitter" placeholder="https://twitter.com/yourusername" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }}/>
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FileIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Upload Resume</h2>
            </div>
            <Input accept=".pdf" id="resume" type="file" />
          </div>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 dark:border-gray-800" style={{borderColor: '#D1D5DB'}}>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <StarIcon className="h-6 w-6" />
              <h2 className="text-lg font-bold">Self-rating</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="communication">Communication and interpersonal skills</Label>
              <Select id="communication">
                <option>1 - Poor</option>
                <option>2 - Fair</option>
                <option>3 - Good</option>
                <option>4 - Very Good</option>
                <option>5 - Excellent</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamwork">Teamwork and collaboration</Label>
              <Select id="teamwork">
                <option>1 - Poor</option>
                <option>2 - Fair</option>
                <option>3 - Good</option>
                <option>4 - Very Good</option>
                <option>5 - Excellent</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="problem-solving">Problem-solving</Label>
              <Select id="problem-solving">
                <option>1 - Poor</option>
                <option>2 - Fair</option>
                <option>3 - Good</option>
                <option>4 - Very Good</option>
                <option>5 - Excellent</option>
              </Select>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '100px' }}>
          <Button
            className='w-full bg-black text-white hover:bg-gray-800'
          >
            Next Round
          </Button>
        </div>
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