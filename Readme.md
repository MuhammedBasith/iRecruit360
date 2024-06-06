# iRecruit360

iRecruit360 is an innovative recruitment management system designed to streamline and enhance the hiring process. By leveraging AI and machine learning, it provides a comprehensive solution for evaluating and managing candidates through multiple interview rounds.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Candidate Account Management:** Candidates can create accounts and manage their profiles.
- **Applicant Tracking:** Track applicant profiles, resumes, and status throughout the recruitment process.
- **Interview Management:** Conduct and manage interviews in three rounds:
  - **Round 1:** Personality analysis using K-means clustering.
  - **Round 2:** Video recording analysis.
  - **Round 3:** Resume extraction and automatic question generation.
- **Team Collaboration:** Enable team collaboration with multi-user access and customizable permissions.
- **Analytics and Reporting:** Utilize large language models to produce analytics and reports on candidate performance.
- **Email Automation:** Automated email notifications for HR to streamline communication.

## Architecture
### Frontend
- Developed using Next.js, Tailwind CSS, and TypeScript.
- Provides an intuitive and responsive interface for candidates and recruiters.

### Backend
- Developed using Python and Flask.
- Handles business logic, data processing, and storage.
- Integrates with Firebase for real-time database management.

### AI Integration
- **K-means Clustering:** Used for personality analysis in the first interview round.
- **Large Language Models:** Employed to generate performance reports and analytics.

## Installation
### Prerequisites
- Node.js
- Python 3.x
- Firebase account

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/MuhammedBasith/iRecruit360.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd iRecruit360
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```

5. **Install backend dependencies:**
   ```bash
   cd ../iRecruit360-backend
   pip install -r requirements.txt
   ```

6. **Set up environment variables:**
   Create a `.env` file in the `iRecruit360-backend` directory and add your environment variables as per the `.env.example` file.

7. **Start the backend server:**
   ```bash
   python server.py
   ```

## Usage
1. **Access the application:**
   Open a web browser and go to `http://localhost:3000` for the frontend.
2. **Sign in or create an account:**
   Begin by signing in or creating a new account to start using the platform.
3. **Explore features:**
   Utilize the dashboard to manage candidates, conduct interviews, and review analytics.

## Project Structure
```plaintext
iRecruit360/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── iRecruit360-backend/
│   ├── irecruit360/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
└── README.md
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For any inquiries or support, please contact [Muhammed Basith](https://github.com/MuhammedBasith).