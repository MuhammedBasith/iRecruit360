
import Link from "next/link"

export default function InterviewFinished() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Congratulations!</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              You've successfully completed the interview process. We're excited to move forward with your application.
            </p>
          </div>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/"
          >
            Continue
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Interview Process</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The interview process consisted of a phone screen, a technical interview, and a final round interview.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Next Steps</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We will be in touch with you shortly to discuss the next steps in the hiring process.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Timeline</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The entire interview process took approximately 2 weeks from start to finish.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Feedback</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We were impressed with your technical skills and problem-solving abilities during the interview.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
