import time
from flask import Flask, render_template, request, send_from_directory
from firebase_admin import auth, credentials, firestore
import firebase_admin
import sys
from firebase import Firebase
from zip_code_api import ZipCodes
from validate import *
#from flask_api import status

app = Flask(__name__, static_folder="../front-end/build/static", template_folder="../front-end/build")
database = Firebase()
zip_codes_api = ZipCodes()

@app.route("/ping")
def hello():
    return "pong"

# Get coaches with filters in query parameters
# Available parameters: zip, radius (in miles), and sport
# Radius and sport are optional
@app.route("/api/v1/coaches", methods = ['GET'])
def get_coaches():

    zip_code = request.args.get('zip')
    radius = request.args.get('radius')
    sport = request.args.get('sport').lower()

    try:

        # Validate the input
        validate_coach_filters(zip_code, radius, sport)
       
        # Get the zip codes in the given radius from the Zip Codes API
        zip_codes_in_radius = zip_codes_api.get_zip_codes_in_radius(zip_code, radius)

        # Get the coaches in the given zip codes with the given sport from the database 
        coaches = database.get_coaches(zip_codes_in_radius, sport)

        return {'coaches':coaches}, 200
        
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

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
    
    id = request.view_args['id']
    try:
        database.verify_token_header(request.headers)
        profile = database.get_profile(id)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    return profile, 200

@app.route("/api/v1/profile/<id>", methods = ['POST'])
def update_profile(id):
    fields = request.json
    id = request.view_args['id']
    try:
        database.update_profile(id, fields)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    return {}, 200

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

