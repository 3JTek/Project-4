import os

secret = os.getenv('SECRET', 'shh, this is a secret')
dburi = os.getenv('DATABASE_URL', 'postgres://localhost:5432/gather')
domainUrl = os.getenv('HEROKU_URL', 'http://localhost:8000/api/')

print(domainUrl)
