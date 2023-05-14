from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from config import *

import pymongo.errors

app = Flask(__name__)
cors = CORS(app)

# JWT
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
jwt = JWTManager(app)

# MONGO
try:
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
    collection = db[MONGO_DB_COLLECTION_NAME]
except pymongo.errors.ConnectionFailure as error:
    print(f"Error connecting to cluster ~> {error}")


@app.route("/login", methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        jsonify({'Invalid JSON Payload'}), 400

    username = data.get('username')
    password = data.get('password')

    user_data = collection.find_one({'username': username})

    if user_data == None:
        return jsonify({'message': 'Invalid credentials, please try again'}), 401

    if check_password_hash(user_data['password'], password):
        access_token = create_access_token(identity=username)
        return jsonify(
            {
                'access_token': access_token,
                'working_time': user_data['config']['work_minutes'],
                'break_time': user_data['config']['break_minutes']
            }), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if password == '':
        return jsonify({'message': 'Password cannot be blank!'}), 401

    if len(password) < 5:
        return jsonify({'message': 'Password is too short, it should be least 5 characters'}), 401

    user_exists = collection.find_one({'username': username})

    if user_exists is not None:
        return jsonify({'message': 'That username is already registered!'}), 422
    else:
        try:
            collection.insert_one({
                'username': username,
                'password': generate_password_hash(password),
                'config': {
                    'work_minutes': DEFAULT_WORK_MINUTES,
                    'break_minutes': DEFAULT_BREAK_MINUTES
                }
            })

            return jsonify({'message': 'User created successfully'}), 200
        except Exception:
            return jsonify({'message': 'There was a problem creating your account!'}), 401


@app.route("/settings", methods=['GET', 'PUT'])
@jwt_required()
def settings():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        user = collection.find_one({'username': current_user})

        return jsonify({
            'user': current_user,
            'working_time': user['config']['work_minutes'],
            'break_time': user['config']['break_minutes']
        }), 200

    if request.method == 'PUT':
        work_minutes = request.json.get('work_minutes', None)
        break_minutes = request.json.get('break_minutes', None)

        current_user = get_jwt_identity()
        user = collection.find_one({'username': current_user})

        user['config']['work_minutes'] = work_minutes
        user['config']['break_minutes'] = break_minutes

        try:
            collection.update_one(
                {'username': current_user},
                {'$set': {
                    'config.work_minutes': work_minutes,
                    'config.break_minutes': break_minutes
                }})

            return jsonify({"message": 'all updated'}), 200
        except Exception:
            return jsonify({"message": 'all updated'}), 401
