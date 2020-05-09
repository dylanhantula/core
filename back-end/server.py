import time
from flask import Flask, render_template, request
from firebase_admin import auth, credentials
import firebase_admin

app = Flask(__name__, static_folder="../front-end/build/static", template_folder="../front-end/build")

# Need an env var set per: https://firebase.google.com/docs/admin/setup
cred = credentials.Certificate("pet_store.json")
firebase_admin.initialize_app(cred)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return "Hello World"

@app.route('/time')
def get_current_time():
    auth_header = request.headers.get('Authorization')
    parts = auth_header.split(' ')
    print(parts[1])

    decoded_token = auth.verify_id_token(parts[1])
    print(decoded_token)

    
    return {'time': time.time()}

@app.route('/protected')
def get_protected():
    print("TEST TEST TEST")
    return {'test': 'test'}

if __name__ == "__main__":
    app.run(debug=True, port=8080)

