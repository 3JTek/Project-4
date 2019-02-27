from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema

class Category(db.Model, BaseModel):

    __tablename__ = 'categories'

    type = db.Column(db.String(80), nullable=False)


class CategorySchema(ma.ModelSchema, BaseSchema):

    users = fields.Nested('UserSchema', many=True, only=('id', 'email', 'location', 'phone_number'))
    sales = fields.Nested('UserSchema', many=True, only=('id', 'title'))

    class Meta:
        model = Category
