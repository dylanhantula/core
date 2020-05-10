import time
from flask import Flask, render_template, request, send_from_directory
from firebase_admin import auth, credentials
import firebase_admin
#from flask_api import status

app = Flask(__name__, static_folder="../front-end/build/static", template_folder="../front-end/build")

# Need an env var set per: https://firebase.google.com/docs/admin/setup
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)

@app.route("/hello")
def hello():
    return "Hello World"

@app.route('/time')
def get_current_time():

    err = verify_token_header(request.headers)
    if err != "":
        return err, 401
    return {'time': time.time()}, 200

@app.route('/protected')
def get_protected():
    return {'test': 'test'}

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

def verify_token_header(headers):
    auth_header = headers.get('Authorization')
    if auth_header == "" or auth_header == None:
        return "no auth header found"

    parts = auth_header.split(' ')
    if len(parts) != 2:
        return "malformed auth header"
    
    decoded_token = auth.verify_id_token(parts[1])
    if decoded_token == "":
        return "unknown error validating token"

    return ""

if __name__ == "__main__":
    app.run(debug=True, port=8080)

