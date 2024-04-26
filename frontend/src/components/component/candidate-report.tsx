'use client'

import React, { useState, useRef,  useEffect } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ResponsiveBar } from "@nivo/bar"
import { Textarea } from "@/components/ui/textarea"

export default function CandidateReport() {

  // const [name, setName] = useState('')
  const [roundOneData, setRoundOneData] = useState({});
  const [roundTwoData, setRoundTwoData] = useState({});
  const [roundThreeData, setRoundThreeData] = useState({});
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
                  Analysis of {name}’s personality based on social media data from LinkedIn and Twitter.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-row items-start gap-4">
                  <div className="grid gap-1.5">
                    <CardTitle>Personality Traits</CardTitle>
                    <CardDescription>
                      The following personality traits have been identified based on the analysis of social media data.
                    </CardDescription>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <div className="font-semibold">Openness</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: 4.2)</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <div className="font-semibold">Conscientiousness</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: 3.8)</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingDownIcon className="h-4 w-4" />
                      <div className="font-semibold">Extraversion</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: 2.1)</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingDownIcon className="h-4 w-4" />
                      <div className="font-semibold">Agreeableness</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: 2.5)</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <div className="font-semibold">Emotional Stability</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">(Score: 4.0)</div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="font-semibold">Insights</div>
                    <div>
                      Venika Murthy demonstrates a high level of openness, indicating a willingness to embrace new ideas
                      and experiences. However, her scores for extraversion and agreeableness are relatively lower,
                      suggesting a more introverted and independent nature. Her emotional stability score is quite
                      positive, indicating a balanced and stable emotional state.
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="font-semibold">Recommendations</div>
                    <div>
                      Based on the analysis, it is recommended to provide Venika with opportunities to work independently
                      and exercise her creativity. Additionally, team-based activities that allow her to collaborate with
                      others in a structured and supportive environment may help her develop stronger interpersonal
                      skills.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Self-rating Questionnaire Results</CardTitle>
                <CardDescription>
                  Results of the self-rating questionnaire based on the Big Five personality traits model.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-semibold">Insights</div>
                  <div>
                    Venika's self-rating questionnaire results align closely with the analysis of her social media data.
                    She has rated herself higher in openness and emotional stability, which is consistent with the
                    insights derived from the personality analysis. Her self-perception of conscientiousness also matches
                    the analysis, indicating that she values organization, planning, and goal-setting in her personal and
                    professional life.
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Recommendations</div>
                  <div>
                    Given that Venika's self-assessment aligns with the questionnaire results, it is important to
                    acknowledge her awareness of her personality traits. HR and team leaders can leverage this
                    self-awareness to create personalized development plans that capitalize on her strengths and address
                    areas where she seeks improvement. Providing opportunities for self-directed learning, mentorship, and
                    feedback can further enhance her professional growth and confidence.
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
                  Analysis of Venika Murthy's video, including metrics such as confidence level, stress level, tone of
                  speech, rate of speech, and filler word usage.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <div className="font-semibold">Insights</div>
                  <div>
                    The video analysis reveals that Venika demonstrates a high level of confidence and articulation in her
                    speech. Her tone is generally positive and engaging, which can contribute to effective communication
                    with colleagues, clients, or team members. While she appears composed and self-assured, there are
                    instances where she exhibits signs of mild stress or nervousness, especially when addressing
                    challenging topics or responding to unexpected questions. Her use of filler words is minimal,
                    indicating that she maintains clarity and coherence in her speech.
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Recommendations</div>
                  <div>
                    Based on the video analysis, it is evident that Venika possesses strong communication skills and
                    presents herself professionally. To further enhance her video presentation skills, she may benefit
                    from targeted training or coaching sessions that focus on refining her body language, using visual
                    aids effectively, and structuring her messages with precision. Encouraging her to participate in mock
                    presentations, public speaking opportunities, or virtual meetings can help her gain more confidence
                    and poise in diverse communication scenarios.
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
                  Venika Murthy's scores based on key skills assessed by the Interview Bot.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-col gap-1.5">
                  <CardTitle>Overall Performance</CardTitle>
                  <CardDescription>
                    The Interview Bot has evaluated Venika's performance across various competencies, providing an
                    automated assessment of her interview readiness and skills. The scores reflect her proficiency in
                    communication, problem-solving, teamwork, adaptability, and other attributes that are crucial for
                    success in the workplace.
                  </CardDescription>
                </div>
                <div className="grid gap-4">
                  <div className="font-semibold">Insights</div>
                  <div>
                    The Interview Bot scores indicate that Venika has demonstrated strengths in areas such as critical
                    thinking, customer interaction, and attention to detail. Her responses to situational questions and
                    behavioral scenarios have been well-reasoned and showcase her ability to effectively handle challenges
                    and make sound decisions. The scores also highlight her positive attitude and professionalism during
                    the virtual interview process, contributing to a favorable impression on the interviewer.
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Recommendations</div>
                  <div>
                    Based on the Interview Bot assessment, it is evident that Venika possesses the competencies required
                    for the role and has performed credibly in the virtual interview. HR and hiring managers can use these
                    insights to validate her skills and cultural fit within the organization. To further support Venika's
                    onboarding and integration, it is recommended to provide her with a personalized orientation program
                    that familiarizes her with the company's policies, values, and team dynamics. Additionally, assigning
                    her a mentor or buddy who can guide her through the initial days and help her navigate the
                    organizational landscape can enhance her sense of belonging and engagement.
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
                      A radar chart depicting Venika Murthy's personality traits based on the assessment.
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
                      An emotional heatmap showing the distribution of emotions in Venika Murthy's video.
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
                  View the parsed resume for additional information about Venika Murthy's qualifications and experience.
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
                  Add comments or observations regarding Venika Murthy's assessment results.
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
