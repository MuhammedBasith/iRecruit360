import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header({ showSignInButton = true, showAdminButton = true, showSignUpButton = true, isSignupPage = false, showAdminHomeButton= false, isLoggedin = false, isCandidateLoggedin = false}) {
    return (
      <header className="flex h-20 w-full items-center px-4 md:px-6 z-40">
        <Link href="/" className="mr-6 hidden lg:flex">
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold px-3">iRecruit360</span>
        </Link>
        <div className="ml-auto flex gap-2">
          {showSignInButton && (
            <Link href="/login">
              <Button variant="outline" className="hover:bg-gray-200 hover:text-gray-800">Sign in</Button>
            </Link>
          )}
          {isSignupPage && (
            <Link href="/login">
              <Button variant="outline" className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Sign in</Button>
            </Link>
          )}
          {showSignUpButton && (
            <Link href="/signup">
              <Button className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Sign Up</Button>
            </Link>
          )}
          {showAdminButton && (
          <Link href="/admin-login">
            <Button className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Admin</Button>
          </Link>
          )}
          {showAdminHomeButton && (
          <Link href="/">
            <Button className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Home</Button>
          </Link>
          )}
          {isLoggedin && (
          <Link href="/">
            <Button className="ml-4 bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out">Logout</Button>
          </Link>
          )}
          {isCandidateLoggedin && (
          <Link href="/">
            <Button className="ml-4 bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out">Logout</Button>
          </Link>
          )}
        </div>

      </header>
    );
  }


function MountainIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>)
    );
  }
  