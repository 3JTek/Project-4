from app import app
from controllers import auth, categories, users

app.register_blueprint(categories.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')
