When you first clone the repo:
1. `cd front-end && npm install`
2. `cd front-end && npm run build`
3. `gunicorn --chdir back-end -b :8080 wsgi:app`


requirements.txt needs to be at the top level of the repo otherwise Google App Engine doesn't find Flask properly
