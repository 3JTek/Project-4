from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
# pylint: disable=C1001,W0232

class Category(db.Model, BaseModel):

    __tablename__ = 'categories'

    type = db.Column(db.String(80), nullable=False)


class CategorySchema(ma.ModelSchema, BaseSchema):

    users = fields.Nested('UserSchema', many=True, only=('email', 'location', 'phone_number'))

    class Meta:
        model = Category
