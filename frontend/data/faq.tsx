import * as React from 'react'

const faq = {
  title: 'Frequently asked questions',
  // description: '',
  items: [
    {
      q: 'Can your platform help identify the best candidates for a specific job role?',
      a: (
        <>
          Yes, our platform employs advanced algorithms to analyze candidate data and assess suitability for specific job roles.
        </>
      ),
    },
    {
      q: 'What types of assessments and tests does your platform offer to evaluate candidates?',
      a: "We offer a variety of assessments, including personality tests, logical reasoning tests, and video analysis, to evaluate candidates comprehensively.",
    },
    {
      q: 'How does the interview bot work, and what role does it play in the hiring process?',
      a: 'Our interview bot engages candidates in structured interviews, adapting questions based on responses and providing real-time feedback to HR personnel.',
    },
    {
      q: 'What security measures are in place to protect candidate data and ensure privacy?',
      a: 'Candidate data is encrypted and protected using industry-standard security measures, ensuring confidentiality and privacy.',
    },
  ],
}

export default faq
