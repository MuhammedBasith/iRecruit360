import os
import google.generativeai as genai
import PIL.Image
import time
from flask import Flask, request, jsonify, make_response
from firebase_admin import credentials, firestore, storage, initialize_app
import json

json_file_path = 'keys.json'

with open(json_file_path, 'r') as file:
    keys_data = json.load(file)


genai_api = keys_data['genai_api']

genai.configure(api_key=genai_api)
humeAPI = keys_data['humeAPI']


def process_pdf_and_extract_details(pdf_data, interview_name, email, db, first_name, last_name, big5_personality):
    try:
        # time.sleep(20)
        img = PIL.Image.open(pdf_data)
        image_model = genai.GenerativeModel('gemini-pro-vision')
        text_model = genai.GenerativeModel('gemini-pro')
        response = image_model.generate_content(
            ["Extract relevant programming skills from the resume image and return as an array", img])

        extracted_text = response.text
        print("Extracted Text:", extracted_text)
        question_response = text_model.generate_content(f'Give me two questions inside an python list as two different elements seperated by commas, you can make the questions from any of these topics {extracted_text}')

        print(question_response)
        generated_questions = question_response.text

        desc_about_big_five = text_model.generate_content(f'{str(big5_personality)}....Heres the score of the big personality analysis of self rated questionnaire by the candidate, give insights about the candidate based on the data that could be helpful for an HR, the candidate name is {first_name} {last_name}')
        big_five_insights = desc_about_big_five.text

        recommendations = text_model.generate_content(f'{str(big5_personality)}...Heres the score of the big personality analysis of self rated questionnaire by the candidate, give job recommendations etc based on the data that could be helpful for an HR, the candidate name is {first_name} {last_name}')
        big_five_recommendations = recommendations.text

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

        # Update 'round_one' in candidate document with the new 'resume_skills'
        candidate_doc = candidate_ref.get()
        current_round_one = candidate_doc.to_dict().get('round_one', {})
        current_round_three = candidate_doc.to_dict().get('round_three', {})
        # print(current_round_one)
        # print(current_round_three)

        # Merge current 'round_one' data with new 'resume_skills'
        updated_round_one = {
            **current_round_one,
            'resume_skills': extracted_text,
            'big_five_insights': big_five_insights,
            'big_five_recommendations': big_five_recommendations,
        }
        updated_round_three = {
            **current_round_three,
            'questions': generated_questions
        }
        print(updated_round_one)
        candidate_ref.update({
            'round_one': updated_round_one,
            'round_three': updated_round_three,
            'name': f'{first_name} {last_name}',  # Assuming 'firstName' and 'lastName' are provided
            'started_interview': True
        })
        os.remove(pdf_data)

    except Exception as e:
        print('Error processing PDF and extracting details:', e)
