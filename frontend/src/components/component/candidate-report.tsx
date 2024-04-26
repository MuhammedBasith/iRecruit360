// @ts-nocheck
'use client'

import React, { useState, useRef,  useEffect } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ResponsiveBar } from "@nivo/bar"
import { Textarea } from "@/components/ui/textarea"

export default function CandidateReport() {

  // const [name, setName] = useState('')
  const [roundOneData, setRoundOneData] = useState({"big5_personality_analysis": {"agreeableness":0, "conscientiousness": 0, "extroversion": 0, "neuroticism": 0, "openness": 0}, "big_five_insights": "Loading...", "big_five_recommendations": "Loading..."});
  const [roundTwoData, setRoundTwoData] = useState({"confidenceResult": "Loading...", "transcription": "Loading...", "question": "Loading..."});
  const [roundThreeData, setRoundThreeData] = useState({"q_a": {}, "answers": "Loading...", "evaluation": {}});
  const name = localStorage.getItem('CandidateNameForReport')
  const email = localStorage.getItem('CandidateEmailForReport')


  const fetchCandidateData  = async () => {
    try {
      const storedEmail = localStorage.getItem('CandidateEmailForReport');
      console.log(storedEmail)
      const storedInterviewName = localStorage.getItem('interviewName');

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: storedEmail,
          interviewName: storedInterviewName
        })
      };

      const response = await fetch('http://localhost:8000/api/getDataForReport', requestOptions);
      if (response.ok) {
        const data = await response.json();
        const roundOneData = data.candidateDataRoundOne;
        const roundTwoData = data.candidateDataRoundTwo;
        const roundThreeData = data.candidateDataRoundThree;

        setRoundOneData(data.candidateDataRoundOne);
        setRoundTwoData(data.candidateDataRoundTwo);
        setRoundThreeData(data.candidateDataRoundThree);
        console.log(data.candidateDataRoundOne)
        console.log(data.candidateDataRoundTwo)
        console.log(data.candidateDataRoundThree)

        // Set state or perform other operations with the received data
    } else {
        console.error('Failed to fetch candidate data');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchCandidateData ();
}, []);

if (!roundOneData || !roundTwoData || !roundThreeData) {
  return <div>Loading...</div>; // Placeholder for loading state
}


  return (
    <div className="flex justify-center items-center py-7 ">
      <Card className="w-full max-w-6xl">
        <CardHeader className="flex flex-row items-start gap-4 p-8 mt-5">
          <div className="grid gap-1.5">
            <CardTitle>Individual Candidate Scorecard</CardTitle>
            <CardDescription>Detailed breakdown of {name}’s assessment results</CardDescription>
          </div>
          <div className="flex flex-col ml-auto shrink-0 items-end">
            <div className="flex flex-row items-center gap-2">
              <Avatar className="border w-10 h-10" imageUrl='https://static.vecteezy.com/system/resources/previews/025/638/560/non_2x/simple-avatar-icon-the-icon-can-be-used-for-websites-print-templates-presentation-templates-illustrations-etc-free-vector.jpg'/>
              <div className="flex flex-col ml-2 leading-none">
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{email}</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-8 p-8">
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Personality Analysis</CardTitle>
                <CardDescription>
                  Analysis of {name}’s personality based on the Self Rating Questionnaire Results.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-row items-start gap-4 mb-10 mt-10">
                  <div className="grid gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <div className="font-semibold">Openness</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: {roundOneData.big5_personality_analysis.openness})</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <div className="font-semibold">Conscientiousness</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: {roundOneData.big5_personality_analysis.conscientiousness})</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingDownIcon className="h-4 w-4" />
                      <div className="font-semibold">Extraversion</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: {roundOneData.big5_personality_analysis.extroversion})</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingDownIcon className="h-4 w-4" />
                      <div className="font-semibold">Agreeableness</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: {roundOneData.big5_personality_analysis.agreeableness})</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <div className="font-semibold">Neuroticism</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: {roundOneData.big5_personality_analysis.neuroticism})</div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="font-semibold">Insights</div>
                    <div>
                    {roundOneData.big_five_insights}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="font-semibold">Recommendations</div>
                    <div>
                    {roundOneData.big_five_recommendations}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Video Analysis</CardTitle>
                <CardDescription>
                  Analysis of {name}’s video, including metrics such as confidence level, stress level, tone of
                  speech, rate of speech, and filler word usage.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-semibold">Question Asked</div>
                  <div>
                  {roundTwoData.question}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Video Transcription</div>
                  <div>
                  {roundTwoData.transcription}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Insights</div>
                  <div>
                  {roundTwoData.confidenceResult}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Interview Bot Scores</CardTitle>
                <CardDescription>
                {name}’s scores based on key skills assessed by the Interview Bot.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-col gap-1.5">
                  <CardTitle>Question asked and the corresponding answer given by {name}.</CardTitle>
                  <CardDescription className='mt-3'>
                  {roundThreeData.q_a && (
                  <div className="grid gap-4">
                    {Object.entries(roundThreeData.q_a).map(([question, answer], index) => (
                      <div key={index}>
                        <div className="font-semibold">Question: {question}</div>
                        <div className="font-semibold">Answer: {answer}</div>
                      </div>
                    ))}
                  </div>
                )}
                {!roundThreeData.q_a && <div>No questions and answers available.</div>}

                  </CardDescription>
                </div>
                <div className="grid gap-4">
                  <div className="font-semibold">Evaluation</div>
                  <div>

                  {roundThreeData.evaluation && (
                  <div className="grid gap-4">
                    {Object.entries(roundThreeData.evaluation).map(([question, feedback], index) => (
                      <div key={index}>
                        <div className="font-semibold">Question: {question}</div>
                        <div className="font-semibold">Feedback:</div>
                        <div>{feedback}</div>
                      </div>
                    ))}
                  </div>
                )}
                {!roundThreeData.evaluation && <div>No evaluations available.</div>}

                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Graphs or Visualizations</CardTitle>
                <CardDescription>
                  Data presented using graphs or visualizations to provide a clear representation of the assessment
                  results.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personality Radar</CardTitle>
                    <CardDescription>
                      A radar chart depicting {name}’s personality traits based on the assessment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <BarChart className="w-full aspect-[1/1]" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Emotional Analysis</CardTitle>
                    <CardDescription>
                      An emotional heatmap showing the distribution of emotions in {name}’s video.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <img
                      alt="Emotional heatmap"
                      className="aspect-video overflow-hidden rounded-lg object-cover"
                      height="225"
                      src="/placeholder.svg"
                      width="400"
                    />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Parsed Resume</CardTitle>
                <CardDescription>
                  View the parsed resume for additional information about {name}’s qualifications and experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button className="w-[200px]" variant="outline">
                  View Parsed Resume
                </Button>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Notes Section</CardTitle>
                <CardDescription>
                  Add comments or observations regarding {name}’s assessment results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Enter your notes here." rows={6} />
              </CardContent>
            </Card>
          </section>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4">
  <div className="flex items-center w-full">
    <Button className="flex-1 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 mr-2" variant="outline">
      <PrinterIcon className="h-4 w-4 mr-2" />
      Print
    </Button>

    <Button className="flex-1 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 ml-2" variant="outline">
      <DownloadIcon className="h-4 w-4 mr-2" />
      Download
    </Button>
  </div>
</CardFooter>



      </Card>
    </div>
  )
}


function PrinterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  )
}


function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}


function TrendingDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  )
}


function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}
