from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
from .user import User, UserSchema

class Sale(db.Model, BaseModel):

    __tablename__ = 'sales'

    title = db.Column(db.String(40), nullable=False)
    content = db.Column(db.String(512), nullable=False)
    expiry_date = db.Column(db.String(40), nullable=False)
    sale_fees = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', backref='sales')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='sales')

class SaleSchema(ma.ModelSchema, BaseSchema):

    user = fields.Nested('UserSchema', only=('business_name','logo', 'hero_image', 'id'))
    category = fields.Nested('CategorySchema', only=('type', 'id', 'users'))

    class Meta:
        model = Sale
