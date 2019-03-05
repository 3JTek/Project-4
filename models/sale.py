# pylint: disable=W0611,W0232
from datetime import datetime
from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
from .user import User, UserSchema

class Sale(db.Model, BaseModel):

    __tablename__ = 'sales'

    title = db.Column(db.String(40), nullable=False)
    content = db.Column(db.String(512), nullable=False)
    expiry_date = db.Column(db.DateTime, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    category = db.relationship('Category', backref='sales')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref='sales')

class SaleSchema(ma.ModelSchema, BaseSchema):

    user = fields.Nested('UserSchema', only=('business_name', 'location',
    'logo', 'hero_image', 'lat', 'lng', 'id'))
    category = fields.Nested('CategorySchema', only=('type', 'id', 'users'))
    expiry_date = fields.DateTime(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Sale
