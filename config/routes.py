import os
from app import app
from controllers import merchants

app.register_blueprint(merchants.api, url_prefix='/api')
