from flask import Flask, request, jsonify, make_response
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS

cred = credentials.Certificate('firestore_cred.json')
app = initialize_app(cred)
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
    flask_app.run(debug=True, port=8000)
