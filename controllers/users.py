from flask import Blueprint, jsonify
from models.user import User, UserSchema

users_schema = UserSchema(many=True)
user_schema = UserSchema()

api = Blueprint('users', __name__)

@api.route('/users', methods=['GET'])
def user_index():
    users = User.query.all()
    return users_schema.jsonify(users)

@api.route('/users/<int:user_id>', methods=['GET'])
def show(user_id):
    user = User.query.get(user_id)

    #Return 404 if user does not exist
    if user is None:
        return jsonify({'message': 'User doesn\'t seem to exist'}), 404
    return user_schema.jsonify(user)
