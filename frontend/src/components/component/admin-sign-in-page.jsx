'use client'

var md5 = require('md5')
import Cookies from "js-cookie"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from '@/components/component/header'
import { useToast } from '@chakra-ui/react'


export default function AdminSignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clicked, setClicked] = useState(false);

  const router = useRouter();
  const toast = useToast()

  const handleSignIn = async () => {
    setClicked(true)
    const hashedPassword = md5(password);

    try {
      const response = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, hashed_password: hashedPassword }),
      });

      if (response.ok) {
        Cookies.set('adminLoggedIn', email)
        router.push('/admin/admin-home');
        toast({
          title: 'Logged in successfully.',
          description: "You’ve successfully logged in to your account.",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      } else {
        setClicked(false)
        toast({
          title: 'Error Signing In',
          description: "Invalid Credentials. Contact Sales.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    (<div className="flex flex-col h-screen w-full">

      <Header showSignInButton={false} showAdminButton={false} showSignUpButton={false} showAdminHomeButton={true} />

      <div className="flex-1 flex items-center justify-center flex-col">
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access iRecruit360 admin panel</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="jhon@udemy.com" type="email" onChange={(e) => setEmail(e.target.value)} className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white' }} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder='**********' type="password" onChange={(e) => setPassword(e.target.value)} className="bg-white text-black placeholder-black border border-gray-300 rounded-md px-4 py-2 w-full" style={{ backgroundColor: 'white' }} />
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleSignIn} disabled={clicked}>Sign in</Button>
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
