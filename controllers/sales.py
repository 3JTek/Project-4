from flask import Blueprint, request, jsonify
from models.sale import Sale, SaleSchema
from lib.twillio import send_text_message

sales_schema = SaleSchema(many=True)
sale_schema = SaleSchema()

api = Blueprint('sales', __name__)

@api.route('/sales', methods=['GET'])
def sale_index():
    sales = Sale.query.all()
    return sales_schema.jsonify(sales)

@api.route('/sales/<string:sale_id>', methods=['GET'])
def sale_show(sale_id):
    print(sale_id)
    #Can get a sale parsing the sales id
    if sale_id.isdigit():
        sale = Sale.query.get(sale_id)
    #...or parsing the sale's title since this is what we will present to the customer (nicer url)
    else:
        sale_title = sale_id.replace('-', ' ').replace('%25', '%')
        print(sale_title)
        sale = Sale.query.filter_by(title=sale_title).first()

    return sale_schema.jsonify(sale)

@api.route('/sales', methods=['POST'])
def sale_create():
    sale, errors = sale_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    sale.save()

    #turning the sale's tile in a more URL style before sending text message
    sale_title = sale.title.replace(' ', '-').replace('%', '%25')

    #Use Twillion API to send a text Message
    send_text_message(sale_title)

    return sale_schema.jsonify(sale)
