from datetime import datetime
import random
from flask import Flask, request, jsonify, make_response
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time

cred = credentials.Certificate('firestore_cred.json')
app = initialize_app(cred)
db = firestore.client()
existing_codes = set()

flask_app = Flask(__name__)
CORS(flask_app)


def generate_unique_code(existing_codes_set):
    while True:
        code = random.randint(100000, 999999)  # Generate a random 6-digit number
        if code not in existing_codes_set:  # Check if the code is not already used
            return code


@flask_app.route('/api/createInterview', methods=['POST'])
def create_interview():
    try:
        print("Received request to create interview")
        # Get data from request
        interview_data = request.json

        # Extract interview details
        interview_name = interview_data['interviewName']
        questions = interview_data['questions']
        candidate_data = interview_data['candidateData']
        print(candidate_data)
        interview_datetime = datetime.strptime(interview_data['interviewDateTime'], '%Y-%m-%d %H:%M')

        # Write data to Firestore
        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference

        interview_ref = hr_ref.collection('created_interviews').document()
        interview_ref.set({
            'interview_name': interview_name,
            'scheduled_datetime': interview_datetime,
            'round_two_questions': questions
        })

        # Clear existing_codes set before adding new codes for this interview
        existing_codes.clear()

        # Add candidates to the interview
        for candidate in candidate_data.split(', '):
            name, email = candidate.split('-')
            new_code = generate_unique_code(existing_codes)
            existing_codes.add(new_code)
            candidate_ref = interview_ref.collection('candidates').document()
            send_email(name, email, interview_name, new_code, interview_datetime, False)
            time.sleep(5)
            candidate_ref.set({
                'name': name,
                'email': email,
                'round_one': {'submitted': False},
                'round_two': {'submitted': False},
                'round_three': {'submitted': False},
                'started_interview': False,
                'unique_code': new_code
            })

        return jsonify({'message': 'Interview created successfully'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@flask_app.route('/api/getCandidatesNames', methods=['GET'])
def getCandidatesNames():
    try:
        interview_name = request.args.get('interviewName')  # Get the interviewName from query parameter

        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference
        interview_ref = hr_ref.collection('created_interviews').where('interview_name', '==', interview_name).get()

        if len(interview_ref) == 0:
            return jsonify({'error': 'Interview not found'}), 404

        candidates = []
        for doc in interview_ref:
            candidates_ref = doc.reference.collection('candidates').stream()
            for candidate in candidates_ref:
                candidate_data = candidate.to_dict()
                print(candidate_data)
                candidates.append({
                    'name': candidate_data.get('name', ''),
                    'email': candidate_data.get('email', ''),
                    'submitted': candidate_data.get('round_three', '')
                })

        print(candidates)
        # Send the candidates as a JSON response
        return jsonify({'candidates': candidates}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Failed to fetch candidates'}), 500


@flask_app.route('/api/rescheduleInterview', methods=['POST'])
def rescheduleInterview():
    try:
        data = request.json
        interview_name = data.get('interviewName')
        new_datetime_str = data.get('interviewDateTime')
        print(new_datetime_str)
        new_datetime = datetime.strptime(new_datetime_str, '%Y-%m-%d %H:%M')

        # Update the interview document in Firestore with the new datetime
        interview_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference
        interview_query = interview_ref.collection('created_interviews').where('interview_name', '==',
                                                                               interview_name).get()

        for doc in interview_query:
            doc.reference.update({'scheduled_datetime': new_datetime})
        candidate_query = doc.reference.collection('candidates').get()
        for candidate in candidate_query:
            candidate_data = candidate.to_dict()
            print(candidate_data['name'])
            send_email(candidate_data['name'], candidate_data['email'], interview_name, candidate_data['unique_code'],
                       new_datetime_str, True)

        # Send a response indicating success
        return jsonify({'message': 'Interview rescheduled successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def send_email(candidateName, candidateEmail, interviewName, secretCode, dateAndTime, rescheduled):
    smtp_server = "smtp.gmail.com"
    userlogin = "teamirecruit360@gmail.com"
    password = "acxk tggb jjzt wwjf"

    sender_email = "teamirecruit360@gmail.com"
    receiver_email = candidateEmail

    if not rescheduled:
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Invitation to Participate in {interviewName} at Edforma"
        message["From"] = sender_email
        message["To"] = receiver_email

        candidate_name = candidateName
        interview_name = interviewName
        company_name = "Edforma"
        secret_code = str(secretCode)
        date_and_time = str(dateAndTime)

        plain_text_template = """\
        Hi,
        
        Congratulations, {candidate_name}! You have been invited to participate in the interview for the position of {interview_name} at {company_name}.
        
        Your secret code for the interview is: {secret_code}
        
        The interview is scheduled for {date_and_time}.
        
        We wish you the best of luck!
        
        Sincerely,
        Team Edforma
        """

        # Replace placeholders with dynamic values
        plain_text_content = plain_text_template.format(
            candidate_name=candidate_name,
            interview_name=interview_name,
            company_name=company_name,
            secret_code=secret_code,
            date_and_time=date_and_time
        )

        # Your HTML template with placeholders
        html_template = """
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
              .container {
                text-align: center;
                margin-top: 50px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
              }
              .heading {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
              }
              .content {
                margin-top: 20px;
                font-size: 16px;
                color: #666666;
              }
              .code {
                font-size: 32px;
                font-weight: bold;
                color: #ff0000; /* Red color for the code */
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="heading">iRecruit360</h1>
              <div class="content">
                <p>Dear [Candidate Name],</p>
                <p>Congratulations! You have been invited to participate in the interview for the position of [Interview Name] at [Company Name].</p>
                <p>Your secret code for the interview is: <br /><span class="code">[Secret Code]</span></p>
                <p>The interview is scheduled for [Date and Time].</p>
                <p>We wish you the best of luck!</p>
                <p>Team Edforma</p>
              </div>
            </div>
          </body>
        </html>
        """

        html_content = html_template.replace("[Candidate Name]", candidate_name)
        html_content = html_content.replace("[Interview Name]", interview_name)
        html_content = html_content.replace("[Company Name]", company_name)
        html_content = html_content.replace("[Secret Code]", secret_code)
        html_content = html_content.replace("[Date and Time]", date_and_time)

        # Now `html_content` contains the HTML with actual dynamic values
        print(html_content)

        # convert both parts to MIMEText objects and add them to the MIMEMultipart message
        part1 = MIMEText(plain_text_template, "plain")
        part2 = MIMEText(html_content, "html")
        message.attach(part1)
        message.attach(part2)

        # send your email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.connect("smtp.gmail.com", 587)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(userlogin, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
        print('Sent')

    else:

        message = MIMEMultipart("alternative")
        message["Subject"] = f"Important: Your Interview for {interviewName} with Edforma Has Been Rescheduled"
        message["From"] = sender_email
        message["To"] = receiver_email

        candidate_name = candidateName
        interview_name = interviewName
        company_name = "Edforma"
        secret_code = str(secretCode)
        date_and_time = str(dateAndTime)

        plain_text_template = """\
        Hi,
        
        Your interview for the position of {interview_name} at {company_name} has been rescheduled.
        
        Your secret code for the interview is: {secret_code}
        
        The new interview is scheduled for {date_and_time}.
        
        We apologize for any inconvenience caused and appreciate your understanding.
        
        Sincerely,
        Team Edforma
        """

        # Replace placeholders with dynamic values
        plain_text_content = plain_text_template.format(
            candidate_name=candidate_name,
            interview_name=interview_name,
            company_name=company_name,
            secret_code=secret_code,
            date_and_time=date_and_time
        )

        # Your HTML template with placeholders
        html_template = """
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>iRecruit360 - Interview Rescheduled</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .heading {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #333;
            }
            .content {
              font-size: 16px;
              color: #555;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              color: #ff0000; /* Red color for the code */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="heading">iRecruit360</h1>
            <div class="content">
              <p>Dear [Candidate Name],</p>
              <p>Your interview for the position of [Interview Name] at [Company Name] has been rescheduled.</p>
              <p>Your secret code for the interview is: <br /><span class="code">[Secret Code]</span></p>
              <p>The new interview is scheduled for [Date and Time].</p>
              <p>We apologize for any inconvenience caused and appreciate your understanding.</p>
              <p>Team Edforma</p>
            </div>
          </div>
        </body>
        </html>
        """

        html_content = html_template.replace("[Candidate Name]", candidate_name)
        html_content = html_content.replace("[Interview Name]", interview_name)
        html_content = html_content.replace("[Company Name]", company_name)
        html_content = html_content.replace("[Secret Code]", secret_code)
        html_content = html_content.replace("[Date and Time]", date_and_time)

        # Now `html_content` contains the HTML with actual dynamic values
        print(html_content)

        # convert both parts to MIMEText objects and add them to the MIMEMultipart message
        part1 = MIMEText(plain_text_template, "plain")
        part2 = MIMEText(html_content, "html")
        message.attach(part1)
        message.attach(part2)

        # send your email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.connect("smtp.gmail.com", 587)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(userlogin, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
        print('Sent')


@flask_app.route('/api/getInterviewNames', methods=['GET'])
def getInterviewNames():
    try:
        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference
        interview_ref = hr_ref.collection('created_interviews').stream()

        interviews = []
        for doc in interview_ref:
            interview_data = doc.to_dict()
            interviews.append(interview_data.get('interview_name', ''))

        print(interviews)
        # Send the interview names as a JSON response
        return jsonify({'interviews': interviews}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Failed to fetch interviews'}), 500


@flask_app.route('/signup', methods=['POST'])
def signup():
    user_data = request.json
    user_ref = db.collection('users').document()
    user_ref.set({
        'fullName': user_data['fullName'],
        'email': user_data['email'],
        'hashedPassword': user_data['hashedPassword']
    })
    return jsonify({'message': 'User signed up successfully'}), 200


@flask_app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    pwd = data['password']

    user_ref = db.collection('users').where('email', '==', email).stream()
    user_data = [doc.to_dict() for doc in user_ref]

    if len(user_data) == 0:
        return jsonify({'error': 'User not found'}), 404

    user = user_data[0]

    if pwd == user['hashedPassword']:
        response = jsonify({'message': 'Login successful', 'user': user})
        return response, 200
    else:
        return jsonify({'error': 'Invalid password'}), 401


@flask_app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('email')
    hashed_password = data.get('hashed_password')

    hr_ref = db.collection('hr').where('email', '==', email).where('password', '==', hashed_password).limit(1).get()
    if len(hr_ref) == 1:
        return jsonify({'message': 'Success'}), 200
    else:
        return jsonify({'message': 'Error: Invalid credentials'}), 401


# Helper function to send email
def send_status_email(candidate_name, candidate_email, action):
    smtp_server = "smtp.gmail.com"
    userlogin = "teamirecruit360@gmail.com"
    password = "acxk tggb jjzt wwjf"

    if action == 'accept':
        subject = f"Congratulations! Your application has been accepted"
        body = f"Dear {candidate_name},\n\nCongratulations! Your application has been accepted. We look forward to working with you.\n\nBest regards,\nTeam Edforma"
    elif action == 'reject':
        subject = f"We regret to inform you"
        body = f"Dear {candidate_name},\n\nWe regret to inform you that your application has been rejected. Thank you for applying.\n\nBest regards,\nTeam Edforma"

    message = MIMEMultipart()
    message["From"] = userlogin
    message["To"] = candidate_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(smtp_server, 587) as server:
        server.starttls()
        server.login(userlogin, password)
        server.sendmail(userlogin, candidate_email, message.as_string())


@flask_app.route('/api/updateCandidateStatus', methods=['POST'])
def update_candidate_status():
    try:
        data = request.json
        candidate_name = data.get('candidateName')
        candidate_email = data.get('candidateEmail')
        action = data.get('action')  # 'accept' or 'reject'

        # Perform action based on the provided 'action'
        if action == 'accept':
            # Send email for acceptance
            send_status_email(candidate_name, candidate_email, 'accept')
            # Additional logic to update candidate status in database if needed
            # Example: db.update_candidate_status(candidate_name, 'Accepted')
        elif action == 'reject':
            # Send email for rejection
            send_status_email(candidate_name, candidate_email, 'reject')
            # Additional logic to update candidate status in database if needed
            # Example: db.update_candidate_status(candidate_name, 'Rejected')

        return jsonify({'message': f'Email sent and candidate {action}ed successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    flask_app.run(debug=True, port=8000, use_reloader=False)
