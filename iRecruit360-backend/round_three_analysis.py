import os
import google.generativeai as genai
import PIL.Image
import time
from flask import Flask, request, jsonify, make_response
from firebase_admin import credentials, firestore, storage, initialize_app
import json
import time

json_file_path = 'keys.json'

with open(json_file_path, 'r') as file:
    keys_data = json.load(file)


genai_api = keys_data['genai_api']

genai.configure(api_key=genai_api)


def check_answer_for_round_three(interview_name, email, db, questions, answers):

    text_model = genai.GenerativeModel('gemini-pro')

    q_a = {}
    final_result = {}
    for i in range(len(questions)):
        print(q_a)
        q_a[questions[i]] = answers[str(i+1)]
        prompt = 'Question by interviewer -> ' + questions[i] + ' Answer by candidate ->' + answers[str(i+1)] + '.....' + 'Imagine that you are a professional interviwer and an expert in programming, provide a fair and concise feedback about this candidate with respect to the answer that is given by them.'
        print(prompt)
        evaluator = text_model.generate_content(prompt)
        evaluation = evaluator.text
        final_result[questions[i]] = evaluation
        time.sleep(10)

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

    candidate_ref = candidate_query[0].reference

    candidate_doc = candidate_ref.get()
    current_round_three = candidate_doc.to_dict().get('round_three', {})

    # Merge current 'round_one' data with new 'resume_skills'
    updated_round_three = {
        **current_round_three,
        'submitted': True,
        'answers': answers,
        'q_a': q_a,
        'evaluation': final_result,
    }
    print(updated_round_three)
    candidate_ref.update({
        'round_three': updated_round_three,
    })

