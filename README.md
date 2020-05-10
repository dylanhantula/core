When you first clone the repo:
1. `cd front-end && npm install`
2. `cd front-end && npm run build`
3. `gunicorn --chdir back-end -b :8080 wsgi:app`


requirements.txt needs to be at the top level of the repo otherwise Google App Engine doesn't find Flask properly

TODO: 
1. Figure out how to safely get Firebase config for front and back end
2. Reconfigure navigation bar and router
3. Break up into components
4. Add publically available sign up for new members
5. Delete unnecessary code
6. Error handling (i.e. what happens if Firebase is unreachable?)
7. Allow two profiles for signing up: coach and athelete