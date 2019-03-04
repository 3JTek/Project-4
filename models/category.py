from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

categories_users = db.Table(
    'categoriess_users',
    db.Column('categories_id', db.Integer, db.ForeignKey('categories.id')),
    db.Column('users_id', db.Integer, db.ForeignKey('users.id'))
)

class Category(db.Model, BaseModel):

    __tablename__ = 'categories'

    type = db.Column(db.String(80), nullable=True)
    logo = db.Column(db.String(50), nullable=True)
    users = db.relationship(
        'User',
        secondary=categories_users,
        backref='categories'
    )


class CategorySchema(ma.ModelSchema, BaseSchema):

    users = fields.Nested('UserSchema', many=True, only=('id', 'email',
    'location', 'lat', 'lng', 'phone_number'))
    sales = fields.Nested('SaleSchema', many=True, only=('id', 'title'))

    class Meta:
        model = Category
