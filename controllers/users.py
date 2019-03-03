from urllib.parse import parse_qs, urlparse
from flask import Blueprint, request, jsonify, g
from models.user import User, UserSchema
from lib.secure_route import secure_route

users_schema = UserSchema(many=True)
user_schema = UserSchema()
partial_schema = UserSchema(partial=True)

api = Blueprint('users', __name__)

@api.route('/users', methods=['GET'])
def user_index():

    #Check if there is a query string to only return customers (not merchants)
    parsed = urlparse(request.url)

    if parse_qs(parsed.query) != {'customers_only':['true']}:
        users = User.query.all()
    else:
        users = User.query.filter_by(is_merchant=False)

    return users_schema.jsonify(users)

@api.route('/users/<int:user_id>', methods=['GET'])
@secure_route
def show_secure(user_id):
    user = User.query.get(user_id)

    #Check if user can access this page
    if user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    #Return 404 if user does not exist
    if user is None:
        return jsonify({'message': 'User doesn\'t seem to exist'}), 404
    return user_schema.jsonify(user)

@api.route('/users/<int:user_id>', methods=['PUT'])
@secure_route
def show_edit(user_id):

    user = User.query.get(user_id)
    user, errors = partial_schema.load(request.get_json(), instance=user)

    if errors:
        return jsonify(errors), 422

    user.save()

    print('RES', partial_schema.jsonify(user))

    return partial_schema.jsonify(user)
