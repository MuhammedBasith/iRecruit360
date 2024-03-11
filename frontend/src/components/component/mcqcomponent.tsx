import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import Header from "./header"
import MyStepper from "./stepper"

export default function MCQComponent() {
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={false} isCandidateLoggedin={true} />
      <div className="mx-auto max-w-3xl space-y-8" style={{marginTop: '70px'}}>
        <MyStepper activeStep={2}/>
      </div>
      <div className="flex flex-col items-center" style={{marginTop: '150px'}}>
        <Card className="w-full max-w-md" style={{ backgroundColor: 'white', borderColor: '#D1D5DB' }}>
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-bold" style={{color: 'black'}}>What is Z</CardTitle>
            <CardDescription>Select the correct answer and click submit.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-row items-center gap-2">
              <RadioGroup defaultValue="a" style={{color: 'black'}}>
                <RadioGroupItem id="a" value="a">
                  <div>
                  <div />
                  </div>
                  <Label className="text-lg font-semibold text-black" htmlFor="a">
                    A. jfnkjn
                  </Label>
                </RadioGroupItem>
                <RadioGroupItem id="b" value="b">
                  <div>
                    <div />
                  </div>
                  <Label className="text-lg font-semibold" htmlFor="b">
                    B.
                  </Label>
                </RadioGroupItem>
                <RadioGroupItem id="c" value="c">
                  <div>
                    <div />
                  </div>
                  <Label className="text-lg font-semibold" htmlFor="c">
                    C.
                  </Label>
                </RadioGroupItem>
                <RadioGroupItem id="d" value="d">
                  <div>
                    <div />
                  </div>
                  <Label className="text-lg font-semibold" htmlFor="d">
                    D.
                  </Label>
                </RadioGroupItem>
              </RadioGroup>
            </div>
            <Button size="sm" className=" bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
