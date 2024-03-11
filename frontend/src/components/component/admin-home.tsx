'use client'

import { Button } from "@/components/ui/button";
import Header from '../../components/component/header';
import { Card } from "../ui/card";
import { useRouter } from 'next/navigation';


export default function AdminHome() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} / >
        <main className="flex-grow flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
          <div className="flex flex-col items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-md" style={{ backgroundColor: 'white', borderColor: '#E5E7EB' }}> {/* Add borderColor to style prop */}
              <div className="flex gap-4"> {/* Wrap the buttons in a flex container */}
                <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out" variant="outline" onClick={() => {router.push('/admin/add-interview')}}>
                  Add interview
                </Button>
                <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out" variant="outline">
                  Show interviews
                </Button>
              </div>
            </Card>
          </div>    
        </main>
      </div>
    </>
  );
}
