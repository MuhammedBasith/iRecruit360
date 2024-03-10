import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import Header from "./header";

export default function CandidateHomePage() {
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />
      <div className="flex flex-col items-center min-h-[600px] px-4 py-6 sm:px-6 sm:py-12 mt-20 flex-grow mb-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold" style={{ marginTop: '40px' }}>Your Interview</h1>
          <p className="text-gray-500 dark:text-gray-400" style={{ marginBottom: '30px' }}>Enter the code provided by your interviewer</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <Card className="rounded-xl p-6" style={{ backgroundColor: 'white' }}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter Your Code</Label>
                <HStack className="flex justify-center mb-4">
                  <PinInput size='lg'>
                    <PinInputField style={{ color: 'black', borderColor: 'black' }} />
                    <PinInputField style={{ color: 'black', borderColor: 'black' }} />
                    <PinInputField style={{ color: 'black', borderColor: 'black' }} />
                    <PinInputField style={{ color: 'black', borderColor: 'black' }} />
                    <PinInputField style={{ color: 'black', borderColor: 'black' }} />
                  </PinInput>
                </HStack>
              </div>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Submit</Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex-grow"></div> {/* Using flex-grow to push content to the center */}
      </div>
    </>
  );
}
