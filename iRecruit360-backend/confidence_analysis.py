import os
import json
import random
import requests
from flask import jsonify
import moviepy
import moviepy.video.io.ffmpeg_tools
import google.generativeai as genai
from hume import HumeBatchClient
from hume.models.config import FaceConfig
import cv2

json_file_path = 'keys.json'

with open(json_file_path, 'r') as file:
    keys_data = json.load(file)


genai_api = keys_data['genai_api']
humeAPI = keys_data['humeAPI']
humeSecret = keys_data['humeSecret']
genai.configure(api_key=genai_api)

api_url = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
authorization_whisper = keys_data['Authorization_Whisper']
print(authorization_whisper)




def process_video(temp_video_path, interview_name, email, db, question):
    output_audio_path = r'./uploads/audio/extracted_audio.flac'
    screenshots_dir = f'./uploads/screenshots/{email}/'

    try:

        os.makedirs(screenshots_dir, exist_ok=True)
        cap = cv2.VideoCapture(temp_video_path)
        frame_numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        count = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            count += 1
            if count in frame_numbers:
                frame_path = os.path.join(screenshots_dir, f"{count}.jpg")
                cv2.imwrite(frame_path, frame)  # Save frame as JPEG
            
            if count >= max(frame_numbers):
                break

        cap.release()
        cv2.destroyAllWindows()
        print('Frames extracted and saved successfully')


        client = HumeBatchClient(humeAPI)
        filepaths = [os.path.join(screenshots_dir, f"{frame_number}.jpg") for frame_number in frame_numbers]
        config = FaceConfig()
        job = client.submit_job(None, [config], files=filepaths)

        print(job)
        print("Running...")

        details = job.await_complete()
        job.download_predictions(f"./uploads/screenshots/{email}/predictions.json")
        print("Predictions downloaded to predictions.json")



        with open(f"./uploads/screenshots/{email}/predictions.json", 'r') as file:
            predictions_data = json.load(file)

        emotions_analysis = {}

        # Iterate through each prediction (image) in the predictions data
        for i in range(len(predictions_data)):
            if 'results' in predictions_data[i] and 'predictions' in predictions_data[i]['results']:
                predictions = predictions_data[i]['results']['predictions']

                if len(predictions) > 0:
                    prediction = predictions[0]  # Assuming there's only one prediction per image
                    if 'models' in prediction and 'face' in prediction['models']:
                        face_models = prediction['models']['face']
                        if 'grouped_predictions' in face_models and len(face_models['grouped_predictions']) > 0:
                            grouped_predictions = face_models['grouped_predictions'][0]  # Assuming only one group
                            if 'predictions' in grouped_predictions and len(grouped_predictions['predictions']) > 0:
                                emotions = grouped_predictions['predictions'][0]['emotions']

                                # Create a dictionary to store emotions for the current image
                                image_emotions = {}

                                # Iterate through each detected emotion
                                for emotion in emotions:
                                    emotion_name = emotion['name']
                                    emotion_score = emotion['score']
                                    image_emotions[emotion_name] = emotion_score

                                # Update emotions_analysis with the current image's emotions
                                emotions_analysis[f'image{i+1}'] = image_emotions


        total_scores = {}
        count_emotions = {}

        # Iterate over each image's emotions in the emotions_analysis dictionary
        for image_emotions in emotions_analysis.values():
            for emotion, score in image_emotions.items():
                if emotion in total_scores:
                    total_scores[emotion] += score
                    count_emotions[emotion] += 1
                else:
                    total_scores[emotion] = score
                    count_emotions[emotion] = 1

        # Calculate average scores for each emotion
        average_scores = {}
        for emotion, total_score in total_scores.items():
            count = count_emotions[emotion]
            average_scores[emotion] = total_score / count


    

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
        print("-------")
        print(response)

        # Optionally handle response from Whisper API
        if response.ok:
            print("Whisper API request successful")
            print(type(response))
            print(response.text)
            print(response.json()['text'])
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
            'transcription': response.json()['text'],
            'question': question,
            'confidenceResult': confidence_result,
            'emotionScores': average_scores,
        }

        print(updated_round_two)
        candidate_ref.update({
            "round_two": updated_round_two
        })

        print('Video processing complete')

    except Exception as e:
        print('Error processing video:', e)

