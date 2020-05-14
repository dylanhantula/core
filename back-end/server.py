import time
from flask import Flask, render_template, request, send_from_directory
from firebase_admin import auth, credentials, firestore
import firebase_admin
import sys
from firebase import Firebase
from validate import *
#from flask_api import status

app = Flask(__name__, static_folder="../front-end/build/static", template_folder="../front-end/build")
database = Firebase()

@app.route("/ping")
def hello():
    return "pong"

@app.route("/api/v1/join", methods = ['POST'])
def create_user():
    user = request.json
    try:
        validate_create_user(user)
        database.save_new_user(user)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    # No body needs to be returned
    return {}, 200

@app.route("/api/v1/profile/<id>", methods = ['GET'])
def get_profile(id):
    database.verify_token_header(request.headers)
    
    id = request.view_args['id']
    try:
        profile = database.get_profile(id)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    return profile, 200

# Routes for serving React content
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/manifest.json")
def manifest():
    return send_from_directory('../front-end/build/', 'manifest.json')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory('../front-end/build/', 'favicon.ico')

@app.route('/logo192.png')
def logo192():
    return send_from_directory('../front-end/build/', 'logo192.png')

# Catches all other routes that are not specified and lets React handle it
@app.route('/<path:path>')
def fallback(path):
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)

