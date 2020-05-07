import time
from flask import Flask, render_template

app = Flask(__name__, static_folder="../front-end/build/static", template_folder="../front-end/build")

@app.route("/")
def index():
    return render_template("index.html")

@app.route
def hello():
    return "Hello World"

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == "__main__":
    app.run(debug=True)

