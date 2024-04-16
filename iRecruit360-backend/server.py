from datetime import datetime
import random
import pandas as pd
import PIL.Image
from flask import Flask, request, jsonify, make_response
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS
import smtplib
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time
from pdf_extraction import process_pdf_and_extract_details
from firebase_admin import credentials, firestore, storage
import uuid
import json
import random
from confidence_analysis import process_video
from round_three_analysis import check_answer_for_round_three

json_file_path = 'keys.json'

with open(json_file_path, 'r') as file:
    keys_data = json.load(file)

# Initialize Flask Uploads

cred = credentials.Certificate('firestore_cred.json')
app = initialize_app(cred, options={'storageBucket': "irecruit360-e0e07.appspot.com"})
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
                'unique_code': new_code,
                'status': 'absent'
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
    smtp_server = keys_data['smtp_server']
    userlogin = keys_data['userLogin']
    password = keys_data['password']

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
    smtp_server = keys_data['smtp_server']
    userlogin = keys_data['userLogin']
    password = keys_data['password']

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


@flask_app.route('/api/verifyInterviewCode', methods=['POST'])
def verify_interview_code():
    try:
        data = request.json
        candidate_email = data.get('email')
        unique_code = data.get('code')

        # Query Firestore to find interviews matching the candidate's email and unique code
        interviews_ref = db.collection_group('candidates').where('email', '==', candidate_email).where('unique_code',
                                                                                                       '==',
                                                                                                       int(unique_code)).stream()

        interviews = []
        for doc in interviews_ref:
            candidate_data = doc.to_dict()
            candidate_name = candidate_data.get('name')
            # Get the interview name and scheduled datetime from the parent document
            parent_ref = doc.reference.parent.parent
            parent_doc = parent_ref.get()
            if parent_doc.exists:
                interview_data = parent_doc.to_dict()
                print(interview_data)
                interview_name = interview_data.get('interview_name')
                interview_datetime = interview_data.get('scheduled_datetime')

                interviews.append({
                    'candidate_name': candidate_name,
                    'interview_name': interview_name,
                    'interview_datetime': interview_datetime
                })

        if interviews:
            # Candidate has interviews associated with the provided code and email
            return jsonify({
                'success': True,
                'interviews': interviews
            }), 200
        else:
            # No interviews found for the provided code and email
            return jsonify({
                'success': False,
                'message': 'No interviews found for the provided code and email'
            }), 404

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


def calculate_big5_personality(personality_responses_str):
    # Assuming personality_responses is a list of 50 responses
    personality_responses = json.loads(personality_responses_str)
    print(personality_responses)
    if len(personality_responses) != 50:
        return None  # Invalid response length

    # Convert responses to a DataFrame for calculation
    responses_df = pd.DataFrame({'response': personality_responses})

    # Perform group summation based on specific column indices
    extroversion = responses_df.iloc[0:10].mean()
    neuroticism = responses_df.iloc[10:20].mean()
    agreeableness = responses_df.iloc[20:30].mean()
    conscientiousness = responses_df.iloc[30:40].mean()
    openness = responses_df.iloc[40:50].mean()
    print(extroversion, neuroticism, agreeableness, conscientiousness, openness)

    return {
        'extroversion': float(extroversion),
        'neuroticism': float(neuroticism),
        'agreeableness': float(agreeableness),
        'conscientiousness': float(conscientiousness),
        'openness': float(openness)
    }


@flask_app.route('/api/submitCandidateData', methods=['POST'])
def submit_candidate_data():
    try:
        # Assuming the request contains form data
        form_data = request.form
        personality_responses = form_data.get('personalityResponses')
        email = form_data.get('email')
        first_name = form_data.get('firstName')
        last_name = form_data.get('lastName')
        dob = form_data.get('dob')
        gender = form_data.get('gender')
        twitter_url = form_data.get('twitterUrl')
        resume_file = request.files['resume'] if 'resume' in request.files else None
        interview_name = form_data.get('interviewName')  # Get interview name from frontend
        print(type(personality_responses))

        big5_personality = calculate_big5_personality(personality_responses)

        if not big5_personality:
            return jsonify({'error': 'Invalid personality responses length'}), 400

        # Process the form data (e.g., print to console)
        print('Received Form Data:')
        print('first_name', first_name)
        print('Email:', email)
        print('Date of Birth:', dob)
        print('Gender:', gender)
        print('Twitter URL:', twitter_url)
        if resume_file:
            print('Resume File:', resume_file.filename)

            # Generate a unique filename for the uploaded file
            filename = f"{uuid.uuid4().hex}.jpg"
            temp_pdf_path = f"./uploads/resumes/{filename}"
            resume_file.save(temp_pdf_path)

            print(temp_pdf_path)

            # # Create a reference to the file in Firebase Storage
            # storage_ref = storage.bucket().blob(f"pdfs/{filename}")
            #
            # # Upload the PDF file to Firebase Storage
            # print(resume_file)
            # storage_ref.upload_from_file(resume_file)

            # Get the download URL of the uploaded PDF
            # pdf_url = storage_ref.public_url
            print(resume_file)
            print('Outside Before Thread-----------')

            # Use GenerativeAI to extract details from the PDF page image

            thread = threading.Thread(target=process_pdf_and_extract_details,
                                      args=(temp_pdf_path, interview_name, email, db, first_name, last_name))
            thread.start()
            print('Outside After Thread-----------')

        # Get a reference to the Firestore collection 'hr'
        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference

        # Query for the specific interview document by interview_name
        interview_query = hr_ref.collection('created_interviews').where('interview_name', '==', interview_name).get()

        if len(interview_query) == 0:
            return jsonify({'error': 'Interview not found'}), 404

        # Assuming we only take the first found interview for simplicity
        interview_ref = interview_query[0].reference

        # Query for the candidate document within the interview based on email
        candidate_query = interview_ref.collection('candidates').where('email', '==', email).get()

        if len(candidate_query) == 0:
            return jsonify({'error': 'Candidate not found in the specified interview'}), 404

        # Assuming we only take the first found candidate for simplicity
        candidate_ref = candidate_query[0].reference

        # Assuming 'round_one' is a nested dictionary within the candidate document
        round_one_data = {
            'submitted': True,
            'personality_responses': personality_responses,
            'email': email,
            'dob': dob,
            'gender': gender,
            'twitter_url': twitter_url,
            'big5_personality_analysis': big5_personality,
        }

        # Update the candidate document with the 'round_one' data
        candidate_ref.update({
            'name': f'{first_name} {last_name}',  # Assuming 'firstName' and 'lastName' are provided
            'round_one': round_one_data,
            'started_interview': True,
        })

        return jsonify({'message': 'Form data received and candidate updated successfully'}), 200

    except Exception as e:
        print('Error processing form data:', e)
        return jsonify({'error': 'Internal Server Error'}), 500


@flask_app.route('/api/submitVideo', methods=['POST'])
def submit_video():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400

        video_file = request.files['video']

        if video_file.filename == '':
            return jsonify({'error': 'No selected video file'}), 400

        if video_file:
            # Generate a unique filename for the video file
            filename = f"{uuid.uuid4().hex}.webm"
            temp_video_path = f"./uploads/videos/{filename}"
            video_file.save(temp_video_path)

            # Prepare data to pass to the thread function
            interview_name = request.form.get('interviewName')
            email = request.form.get('email')
            question = request.form.get('question')

            # Start a new thread to process the video asynchronously
            thread = threading.Thread(target=process_video,
                                      args=(temp_video_path, interview_name, email, db, question))
            thread.start()

            return jsonify({'message': 'Video submitted successfully'}), 200

    except Exception as e:
        print('Error submitting video:', e)
        return jsonify({'error': 'Internal Server Error'}), 500


@flask_app.route('/api/getQuestion', methods=['POST'])
def get_question():
    try:

        data = request.json
        interview_name = data.get('interviewName')

        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference
        interview_query = hr_ref.collection('created_interviews').where('interview_name', '==', interview_name).get()

        if not interview_query:
            return jsonify({'error': 'Interview not found'}), 404

        # Extract questions from the interview document
        interview_document = interview_query[0]
        round_two_questions = interview_document.get('round_two_questions')

        # Split questions string into a list (assuming questions are separated by commas)
        questions_list = [question.strip() for question in round_two_questions.split(',')]

        # Select a random question (or handle question selection logic as needed)
        selected_question = questions_list[random.randint(0, len(questions_list) - 1)]

        return jsonify({'question': selected_question}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@flask_app.route('/api/getQuestions', methods=['POST'])
def get_questions():
    try:
        print('here')
        request_data = request.json
        interview_name = request_data.get('interviewName')
        print(interview_name)
        email = request_data.get('email')

        # Assuming Firestore collection paths and structure
        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference
        interview_query = hr_ref.collection('created_interviews').where('interview_name', '==', interview_name).get()

        if len(interview_query) == 0:
            return jsonify({'error': 'Interview not found'}), 404

        # Get the interview reference
        interview_ref = interview_query[0].reference

        # Query candidate by email
        candidate_query = interview_ref.collection('candidates').where('email', '==', email).get()
        print(candidate_query)

        if len(candidate_query) == 0:
            return jsonify({'error': 'Candidate not found'}), 404

        # Assuming we only take the first found candidate for simplicity
        candidate_doc = candidate_query[0]
        candidate_data = candidate_doc.to_dict().get('round_three', {})

        # Print all the contents of candidate_doc
        print(candidate_data['questions'])
        questions_list = json.loads(candidate_data['questions'])
        print(questions_list)

        return jsonify({'questions': questions_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@flask_app.route('/api/roundThreeSubmitAnswers', methods=['POST'])
def submit_answers():
    try:
        # Get data from the request body
        data = request.get_json()
        email = data.get('email')
        interview_name = data.get('interviewName')
        answers = data.get('answers')
        questions = data.get('questions')

        thread = threading.Thread(target=check_answer_for_round_three,
                                  args=(interview_name, email, db, questions, answers))
        thread.start()

        return jsonify({'message': 'Answers submitted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    flask_app.run(debug=True, port=8000, use_reloader=False)
