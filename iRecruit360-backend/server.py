from datetime import datetime
import random
from flask import Flask, request, jsonify, make_response
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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

        # Add candidates to the interview
        for candidate in candidate_data.split(', '):
            name, email = candidate.split('-')
            new_code = generate_unique_code(existing_codes)
            existing_codes.add(new_code)
            candidate_ref = interview_ref.collection('candidates').document()
            send_email(name, email, interview_name, new_code, interview_datetime)
            candidate_ref.set({
                'name': name,
                'email': email,
                'round_one': {'submitted': False},
                'round_two': {'submitted': False},
                'round_three': {'submitted': False},
                'started_interview': False,
                'unique_code': new_code
            })
        existing_codes.clear()

        return jsonify({'message': 'Interview created successfully'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


def send_email(candidateName, candidateEmail, interviewName, secretCode, dateAndTime):
    smtp_server = "smtp.gmail.com"
    userlogin = "teamirecruit360@gmail.com"
    password = "acxk tggb jjzt wwjf"

    sender_email = "teamirecruit360@gmail.com"
    receiver_email = candidateEmail
    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
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
          .container {
            text-align: center;
            margin-top: 50px;
          }
          .heading {
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            margin-top: 20px;
            font-size: 16px;
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


if __name__ == '__main__':
    flask_app.run(debug=True, port=8000, use_reloader=False)
