"use client"
var md5 = require('md5')
import Link from "next/link"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from '@/components/component/header'
import { useToast } from '@chakra-ui/react'

export default function SignInPage() {

  const router = useRouter();
  const toast = useToast()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
        const hashedPassword = md5(password)
        console.log(hashedPassword)

        const response = await axios.post('http://localhost:8000/api/login', {
            email: email,
            password: hashedPassword
        });

        if (response.status === 200) {
            router.push('/dashboard');
            toast({
              title: 'Logged in successfully.',
              description: "You’ve successfully logged in to your account.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })

        } else {
          toast({
            title: 'Error Signing In',
            description: "Invalid Credentials",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
    } catch (error) {
      toast({
        title: 'Error Signing In',
        description: "Something went wrong. Please try again.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };
  
  return (
    (<div className="flex flex-col h-screen w-full">

      <Header showSignInButton={false} showAdminButton={false} showSignUpButton={true} />


      <div className="flex-1 flex items-center justify-center flex-col">
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your information to access iRecruit360</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="jhon@udemy.com" type="email" onChange={(e) => setEmail(e.target.value)} className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white' }} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} type="password" className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white' }} />
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleSignIn} >Sign in</Button>
          <div className="flex justify-end">
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
      <footer className="pb-4 lg:pb-6 xl:pb-8">
        <div className=" flex justify-center gap-4 px-6 flex-shrink-0">
          <Link className="m-0 inline-flex items-center space-x-2 text-sm" href="#">
            <GithubIcon className="h-4 w-4" />
            <span className="font-medium">Github</span>
          </Link>
          <Link className="m-0 inline-flex items-center space-x-2 text-sm" href="#">
            <StoreIcon className="h-4 w-4" />
            <span className="font-medium">Contact Sales</span>
          </Link>
        </div>
      </footer>
    </div>)
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


function GithubIcon(props) {
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
      <path
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>)
  );
}


function StoreIcon(props) {
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
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path
        d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>)
  );
}
