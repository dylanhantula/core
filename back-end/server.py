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

@app.route("/api/v1/create/event/<status>", methods = ['POST'])
def create_event(status):
    status = request.view_args['status']
    event = request.json
    try:
        database.verify_token_header(request.headers)
        database.create_event(event, status)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    # No body needs to be returned
    return {}, 200

@app.route("/api/v1/create/event/repeating", methods = ['POST'])
def create_repeating_event():
    event = request.json
    try:
        database.verify_token_header(request.headers)
        database.create_repeating_event(event)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    # No body needs to be returned
    return {}, 200

@app.route("/api/v1/update/event/<eventID>", methods = ['PUT'])
def update_event(eventID):
    eventID = request.view_args['eventID']
    updates = request.json
    try:
        database.verify_token_header(request.headers)
        database.update_event(eventID, updates)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    # No body needs to be returned
    return {}, 200



@app.route("/api/v1/events", methods = ['GET'])
def get_events():

    coachID = request.args.get('id')
    date = request.args.get('date')

    try:
        database.verify_token_header(request.headers)
        events, events_by_user, clients = database.get_events(coachID, 'events', int(date))
        pending_events, pending_events_by_user, pending_clients = database.get_events(coachID, 'pending_events', int(date))
        personal_events = database.get_events(coachID, 'personal_events', int(date))
        return {'events': events, 
                'eventsByUser': events_by_user, 
                'clients': clients, 
                'pendingEvents': pending_events, 
                'pendingEventsByUser': pending_events_by_user, 
                'pendingClients': pending_clients,
                'personalEvents': personal_events}, 200
        
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400


@app.route("/api/v1/events/repeating", methods = ['GET'])
def get_repeating_events():

    id = request.args.get('id')
    profileType = request.args.get('type')

    try:
        database.verify_token_header(request.headers)
        events = database.get_repeating_events(id, profileType)

        return {'repeating_events': events }, 200
        
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400



@app.route("/api/v1/create/message", methods = ['POST'])
def create_message():
    message = request.json
    try:
        database.create_message(message)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    # No body needs to be returned
    return {}, 200

@app.route("/api/v1/messages/<id>", methods = ['GET'])
def get_messages(id):
    
    id = request.view_args['id']
    try:
        database.verify_token_header(request.headers)
        messages, conversations = database.get_messages(id)
    except Exception as e:
        print(e)
        return {"message":str(e)}, 400

    return {'messages': messages, 'conversations': conversations}, 200

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

@app.route("/api/v1/profile/<id>", methods = ['PUT'])
def update_profile(id):
    fields = request.json
    id = request.view_args['id']
    try:
        database.verify_token_header(request.headers)
        profile = database.update_profile(id, fields)
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

