import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiMoon, FiSun, FiLogIn } from 'react-icons/fi';



export default function Header({ showSignInButton = true, showAdminButton = true, showSignUpButton = true, isSignupPage = false, showAdminHomeButton= false, isLoggedin = false, isCandidateLoggedin = false}) {
  const bg = useColorModeValue('whiteAlpha.700', 'rgba(29, 32, 37, 0.7)');
  const { colorMode, toggleColorMode } = useColorMode();  
  
  
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 z-40">
      <Link href="/" className="mr-6 hidden lg:flex items-center">
        <MountainIcon className="h-6 w-6" />
        <span className="font-bold px-3">iRecruit360</span>
      </Link>
      <div className="ml-auto flex gap-2 items-center">
        {showSignInButton && (
          <Link href="/login">
            <Button variant="outline" className="hover:bg-gray-200 hover:text-gray-800">
              Sign in
            </Button>
          </Link>
        )}
        {isSignupPage && (
          <Link href="/login">
            <Button
              variant="outline"
              className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Sign in
            </Button>
          </Link>
        )}
        {showSignUpButton && (
          <Link href="/signup">
            <Button
              className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Sign Up
            </Button>
          </Link>
        )}
        {showAdminButton && (
          <Link href="/admin-login">
            <Button
              className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Admin
            </Button>
          </Link>
        )}
        {showAdminHomeButton && (
          <Link href="/">
            <Button
              className="ml-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Home
            </Button>
          </Link>
        )}
        {isLoggedin && (
          <Link href="/">
            <Button
              className="ml-4 bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Logout
            </Button>
          </Link>
        )}
        {isCandidateLoggedin && (
          <Link href="/">
            <Button
              className="ml-4 bg-red-600 text-white hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Logout
            </Button>
          </Link>
        )}
        <IconButton
          aria-label="Theme Toggle"
          icon={colorMode === 'light' ? <FiMoon size="14" /> : <FiSun size="14" />}
          borderRadius="md"
          onClick={toggleColorMode}
          ml="2"
          variant='outline'
        />
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
  