from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config.environment import dburi

app = Flask(__name__, static_folder='dist')

app.config['SQLALCHEMY_DATABASE_URI'] = dburi
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from config import routes
