from flask import Flask, request, jsonify
from firebase_admin import credentials
from firebase_admin import firestore
from flask_cors import CORS, cross_origin
import firebase_admin

cred = credentials.Certificate('firestore_cred.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

flask_app = Flask(__name__)
CORS(flask_app)


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
    # print(pwd)

    # Query Firestore for the user with the provided email
    user_ref = db.collection('users').where('email', '==', email).stream()
    user_data = [doc.to_dict() for doc in user_ref]

    if len(user_data) == 0:
        return jsonify({'error': 'User not found'}), 404

    user = user_data[0]

    if pwd == user['hashedPassword']:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid password'}), 401


if __name__ == '__main__':
    flask_app.run(debug=True, port=8000)
