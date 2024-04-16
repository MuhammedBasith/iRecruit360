import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function RoundThreeQuestionsComponent() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>Please provide your feedback for each question.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>1.</span>
            <span>Was the content helpful?</span>
          </div>
          <Textarea className="min-h-[100px]" placeholder="Enter your feedback..." />
        </div>
        <div className="grid items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>2.</span>
            <span>How likely are you to recommend this feature to a friend or colleague?</span>
          </div>
          <Textarea className="min-h-[100px]" placeholder="Enter your feedback..." />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Submit feedback</Button>
      </CardFooter>
    </Card>
  )
}
