import time

import PIL
import pyautogui
from PIL import Image
import pytesseract
import requests
import os
import google.generativeai as genai
import json

json_file_path = 'keys.json'

with open(json_file_path, 'r') as file:
    keys_data = json.load(file)

genai_api = keys_data['genai_api']
# Define the region of the screen to monitor (adjust coordinates as needed)
SCREEN_REGION = (1100, 130, 1080, 600)  # (left, top, width, height)

text_model = genai.GenerativeModel('gemini-pro-vision')


# Function to capture and extract text from a specific region of the screen
def capture_and_extract_text(region):
    # Capture screenshot of the specified region
    screenshot = pyautogui.screenshot(region=region)

    # Save screenshot to a temporary file (required by pytesseract)
    temp_file = "temp_screen.png"
    screenshot.save(temp_file)

    pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
    # Use pytesseract to extract text from the screenshot
    extracted_text = pytesseract.image_to_string(Image.open(temp_file))
    print(extracted_text)

    # Clean up temporary file
    # os.remove(temp_file)

    return extracted_text


# Function to send extracted text to the backend server
def send_text_to_backend(text):
    img = PIL.Image.open('./temp_screen.png')

    response = text_model.generate_content(["choose correct answer, questions are related to system design", img])

    answer = response.text
    return answer


# Main function to continuously monitor and process screen changes
def monitor_screen_changes(region):
    previous_text = None

    while True:
        # Capture and extract text from the specified screen region
        current_text = capture_and_extract_text(region)

        # Compare current text with previous text
        if current_text and current_text != previous_text:
            print(f"Detected change: {current_text}")

            # Send extracted text to the backend server
            response = send_text_to_backend('temp_screen.png')

            if response:
                print(f"Answer: {response}")

        # Delay for a short interval before capturing the next screen
        time.sleep(8)  # Adjust delay as needed


# Start monitoring the screen changes
monitor_screen_changes(SCREEN_REGION)
