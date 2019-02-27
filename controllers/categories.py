from flask import Blueprint
from models.category import Category, CategorySchema

categories_schema = CategorySchema(many=True)

api = Blueprint('categories', __name__)

@api.route('/categories', methods=['GET'])
def categories_index():
    categories = Category.query.all()
    return categories_schema.jsonify(categories)
