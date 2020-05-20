## When you first clone the repo
1.  Install the front end dependencies by running `cd front-end && npm install && cd ..`
2. Install the backend dependencies by running `pip install -r requirements.txt`
3. Add the Firebase app config in a file called `firebase_config.json` in `front-end/src/`.
    - Go to Firebase Project Settings site and look for "Web apps" under General. You will see a JavaScript object of the form:
    ```
    var firebaseConfig = {
        apiKey: "XXXX",
        authDomain: "XXXX",
        databaseURL: "XXXX",
        projectId: "XXXX",
        storageBucket: "XXXX",
        messagingSenderId: "XXXX",
        appId: "XXXX",
        measurementId: "XXXX"
    };
    ```
    - Take that information and create a JSON file of the form:
    ```
    {
        "config": {
            "apiKey": "XXXX",
            "authDomain": "XXXX",
            "databaseURL": "XXXX",
            "projectId": "XXXX",
            "storageBucket": "XXXX",
            "messagingSenderId": "XXXX",
            "appId": "XXXX",
            "measurementId": "XXXX"
        }
    }
    ```
    - Name the JSON file `firebase_config.json` and put it in `front-end/src/`
4. Add the Firebase Service Account information in a file called `firebase_key.json` in `back-end/`
    - Go to Firebase Project Settings site and click on the "Service accounts" tab 
    - Click "Generate new private key" to download a new service account file
    - Rename the file `firebase_key.json` and put it in `back-end`
5. Add the ZipCodeAPI.com API key in a file called `zip_code_api_key` in `back-end/`
    - This is only given the first time the application is registred with ZipCodeAPI.com (someone will have to give this to you)

## To run the application in "development" mode
1. Open a terminal session
2. Run the backend: `cd back-end && python3 server.py`
3. Open a new termainl session
4. Run the frontend: `cd front-end && npm start`

## To run the application in "production" mode
1. Open a terminal session
2. Build the frontend: `cd front-end && npm run build && cd ..`
3. Run the backend & frontend together: `gunicorn --chdir back-end -b :8080 wsgi:app`

## Notes
- requirements.txt needs to be at the top level of the repo otherwise Google App Engine doesn't find Flask properly

TODO: 
1. Integrate with a Material UI component
2. Get server port from env var
3. Error handling (i.e. what happens if Firebase is unreachable?)
4. Restyle
