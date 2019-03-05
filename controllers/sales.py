from flask import Blueprint, request, jsonify, json
from models.sale import Sale, SaleSchema
from models.user import UserSchema
from lib.twillio import send_text_message

sales_schema = SaleSchema(many=True)
sale_schema = SaleSchema()

users_schema = UserSchema(many=True)

api = Blueprint('sales', __name__)

@api.route('/sales', methods=['GET'])
def sale_index():
    sales = Sale.query.all()
    return sales_schema.jsonify(sales)

@api.route('/sales/<int:sale_id>', methods=['GET'])
def sale_show(sale_id):

    #Can get a sale parsing the sales id
    sale = Sale.query.get(sale_id)

    #Return 404 if sale doesn't exist
    if sale is None:
        return jsonify({'message': 'User doesn\'t seem to exist'}), 404

    return sale_schema.jsonify(sale)

@api.route('/sales', methods=['POST'])
def sale_create():

    #Create the sale
    sale, errors = sale_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    sale.save()

    #Get the list of user to contact for this sale
    users_to_contact = json.loads(request.data).get('customerToReach')

    #Use Twillion API to send a text Message to those users
    for user in users_to_contact:
        print(user)
        if user.get('email') == 'jeremy@gmail.com':
            send_text_message(sale.id, sale.title)
            print('contacted')

    return sale_schema.jsonify(sale)
