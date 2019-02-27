from flask import Blueprint
from models.merchant import Merchant, MerchantSchema

merchants_schema = MerchantSchema(many=True)

api = Blueprint('merchants', __name__)

@api.route('/merchants', methods=['GET'])
def merchant_index():
    merchants = Merchant.query.all()
    return merchants_schema.jsonify(merchants)
