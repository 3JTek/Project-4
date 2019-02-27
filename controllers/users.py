from flask import Blueprint
from models.user import User, UserSchema

users_schema = UserSchema(many=True)

api = Blueprint('users', __name__)

@api.route('/users', methods=['GET'])
def user_index():
    users = User.query.all()
    return users_schema.jsonify(users)
