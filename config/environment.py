import os

secret = os.getenv('SECRET', 'shh, this is a secret')
dburi = os.getenv('DATABSEURI', 'postgres://localhost:5432/gather')
domainUrl = os.getenv('DEV_DOMAIN', 'HEROKU_URL')
