import os
import json
import google.generativeai as genai
import requests
from flask import jsonify
import moviepy.video.io.ffmpeg_tools

json_file_path = 'keys.json'

with open(json_file_path, 'r') as file:
    keys_data = json.load(file)


genai_api = keys_data['genai_api']

genai.configure(api_key=genai_api)

api_url = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
authorization_whisper = keys_data['Authorization_Whisper']


def process_video(temp_video_path, interview_name, email, db, question):
    output_audio_path = r'./uploads/audio/extracted_audio.flac'
    try:
        try:
            temp = moviepy.video.io.ffmpeg_tools.ffmpeg_extract_audio(temp_video_path, output_audio_path)
            print("Audio extraction successful!")
        except Exception as e:
            print("Error extracting audio:", e)

        # Read FLAC audio data
        with open(r'./uploads/audio/extracted_audio.flac', "rb") as f:
            audio_data = f.read()

        # Whisper API request
        headers = {"Authorization": authorization_whisper}
        response = requests.post(api_url, headers=headers, data=audio_data)

        # Optionally handle response from Whisper API
        if response.ok:
            print("Whisper API request successful")
            print(response.text)
        else:
            print("Whisper API request failed")

        # Clean up temporary audio and video files
        os.remove(temp_video_path)
        os.remove('./uploads/audio/extracted_audio.flac')

        text_model = genai.GenerativeModel('gemini-pro')
        confidence_from_voice_data = text_model.generate_content(f'Imagine that you are a professional interviewer, youve asked a candidate -> {question}.. and the response from the candidate was this -> {response.text}... Based on the response, I want you as an experienced and professional interviewer to generate me a summary on the confidence of the candidate, the accurateness of the answer, and a feedback about the candidate')
        confidence_result = confidence_from_voice_data.text
        print(confidence_result)

        hr_ref = db.collection('hr').where('company_name', '==', 'Edforma').get()[0].reference

        # Query for the specific interview document by interview_name
        interview_query = hr_ref.collection('created_interviews').where('interview_name', '==', interview_name).get()

        if len(interview_query) == 0:
            return jsonify({'error': 'Interview not found'}), 404

        # Assuming we only take the first found interview for simplicity
        interview_ref = interview_query[0].reference

        candidate_query = interview_ref.collection('candidates').where('email', '==', email).get()

        if len(candidate_query) == 0:
            return jsonify({'error': 'Candidate not found in the specified interview'}), 404

        # Assuming we only take the first found candidate for simplicity
        candidate_ref = candidate_query[0].reference

        # Update 'round_one' in candidate document with the new 'resume_skills'
        candidate_doc = candidate_ref.get()
        current_round_two = candidate_doc.to_dict().get('round_two', {})

        updated_round_two = {
            **current_round_two,
            'submitted': True,
            'transcription': response.text.text,
            'question': question,
            'confidenceResult': confidence_result
        }

        print(updated_round_two)
        candidate_ref.update({
            "round_two": updated_round_two
        })

        print('Video processing complete')

    except Exception as e:
        print('Error processing video:', e)

