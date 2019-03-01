import os

secret = os.getenv('SECRET', 'shh, this is a secret')
dburi = os.getenv('DATABASE_URL', 'postgres://localhost:5432/gather')
