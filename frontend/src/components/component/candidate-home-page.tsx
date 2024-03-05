import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'

export default function CandidateHomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Your Interview</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter the code provided by your interviewer</p>
      </div>
      <Card className="w-full max-w-sm rounded-xl p-6" style={{ backgroundColor: 'white' }}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Enter Your Code</Label>
            {/* <Input id="code" placeholder="Code" required /> */}
            <HStack className="flex justify-center mb-4">
              <PinInput size='lg'>
                <PinInputField style={{ color: 'black' }} />
                <PinInputField style={{ color: 'black' }} />
                <PinInputField style={{ color: 'black' }} />
                <PinInputField style={{ color: 'black' }} />
                <PinInputField style={{ color: 'black' }} />
              </PinInput>
            </HStack>
          </div>
          <Button className="w-full bg-black">Submit</Button>
        </CardContent>
      </Card>
      <div className="h-8"></div> {/* Adding space below the card */}
    </div>
  );
}
