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

@api.route('/sales/<int:sale_id>', methods=['GET'])
def sale_show(sale_id):
    sale = Sale.query.get(sale_id)
    return sale_schema.jsonify(sale)

@api.route('/sales', methods=['POST'])
def sale_create():
    sale, errors = sale_schema.load(request.get_json())
    # sale.creator = g.current_user

    if errors:
        return jsonify(errors), 422

    sale.save()

    sale_title = sale.title.replace(' ', '-')
    #Use Twillion API to send a text Message
    send_text_message(sale_title)

    return sale_schema.jsonify(sale)
