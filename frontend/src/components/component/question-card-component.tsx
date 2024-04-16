import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function QuestionCardComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personality Test</CardTitle>
        <CardDescription>Answer each question as accurately as possible.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="font-semibold">1.</div>
            <div>I am the life of the party.</div>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label
              className="text-xs text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              htmlFor="q1-1"
            >
              Strongly Disagree
            </Label>
            <input
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              disabled
              id="q1-1"
              name="q1"
              type="radio"
              value="1"
            />
            <input id="q1-2" name="q1" type="radio" value="2" />
            <input id="q1-3" name="q1" type="radio" value="3" />
            <input id="q1-4" name="q1" type="radio" value="4" />
            <input
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              disabled
              id="q1-5"
              name="q1"
              type="radio"
              value="5"
            />
            <Label className="text-xs" htmlFor="q1-2">
              2
            </Label>
            <Label className="text-xs" htmlFor="q1-3">
              3
            </Label>
            <Label className="text-xs" htmlFor="q1-4">
              4
            </Label>
            <Label className="text-xs" htmlFor="q1-5">
              Strongly Agree
            </Label>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="font-semibold">2.</div>
            <div>I don't talk a lot.</div>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label
              className="text-xs text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              htmlFor="q2-1"
            >
              Strongly Disagree
            </Label>
            <input id="q2-1" name="q2" type="radio" value="1" />
            <input id="q2-2" name="q2" type="radio" value="2" />
            <input id="q2-3" name="q2" type="radio" value="3" />
            <input id="q2-4" name="q2" type="radio" value="4" />
            <input id="q2-5" name="q2" type="radio" value="5" />
            <Label className="text-xs" htmlFor="q2-2">
              2
            </Label>
            <Label className="text-xs" htmlFor="q2-3">
              3
            </Label>
            <Label className="text-xs" htmlFor="q2-4">
              4
            </Label>
            <Label className="text-xs" htmlFor="q2-5">
              Strongly Agree
            </Label>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="font-semibold">3.</div>
            <div>I feel comfortable around people.</div>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label
              className="text-xs text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              htmlFor="q3-1"
            >
              Strongly Disagree
            </Label>
            <input id="q3-1" name="q3" type="radio" value="1" />
            <input id="q3-2" name="q3" type="radio" value="2" />
            <input id="q3-3" name="q3" type="radio" value="3" />
            <input id="q3-4" name="q3" type="radio" value="4" />
            <input id="q3-5" name="q3" type="radio" value="5" />
            <Label className="text-xs" htmlFor="q3-2">
              2
            </Label>
            <Label className="text-xs" htmlFor="q3-3">
              3
            </Label>
            <Label className="text-xs" htmlFor="q3-4">
              4
            </Label>
            <Label className="text-xs" htmlFor="q3-5">
              Strongly Agree
            </Label>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="font-semibold">4.</div>
            <div>I keep in the background.</div>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label
              className="text-xs text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              htmlFor="q4-1"
            >
              Strongly Disagree
            </Label>
            <input id="q4-1" name="q4" type="radio" value="1" />
            <input id="q4-2" name="q4" type="radio" value="2" />
            <input id="q4-3" name="q4" type="radio" value="3" />
            <input id="q4-4" name="q4" type="radio" value="4" />
            <input id="q4-5" name="q4" type="radio" value="5" />
            <Label className="text-xs" htmlFor="q4-2">
              2
            </Label>
            <Label className="text-xs" htmlFor="q4-3">
              3
            </Label>
            <Label className="text-xs" htmlFor="q4-4">
              4
            </Label>
            <Label className="text-xs" htmlFor="q4-5">
              Strongly Agree
            </Label>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="font-semibold">5.</div>
            <div>I start conversations.</div>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label
              className="text-xs text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-100"
              htmlFor="q5-1"
            >
              Strongly Disagree
            </Label>
            <input id="q5-1" name="q5" type="radio" value="1" />
            <input id="q5-2" name="q5" type="radio" value="2" />
            <input id="q5-3" name="q5" type="radio" value="3" />
            <input id="q5-4" name="q5" type="radio" value="4" />
            <input id="q5-5" name="q5" type="radio" value="5" />
            <Label className="text-xs" htmlFor="q5-2">
              2
            </Label>
            <Label className="text-xs" htmlFor="q5-3">
              3
            </Label>
            <Label className="text-xs" htmlFor="q5-4">
              4
            </Label>
            <Label className="text-xs" htmlFor="q5-5">
              Strongly Agree
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
