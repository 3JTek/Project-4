from datetime import datetime, timedelta
from app import db, ma, bcrypt
import jwt
from config.environment import secret
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields
from .category import Category, CategorySchema
from .base import BaseModel, BaseSchema
# pylint: disable=R0201,C1001,W0232

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    #Auth
    email = db.Column(db.String(40), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)

    #Shared
    location = db.Column(db.String(200), nullable=False)

    #merchants
    business_name = db.Column(db.String(50), nullable=True)
    logo = db.Column(db.String(80), nullable=True)
    image = db.Column(db.String(80), nullable=True)

    #Customer
    phone_number = db.Column(db.String(30), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', backref='users')

    is_merchant = db.Column(db.Boolean, nullable=False)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token


class UserSchema(ma.ModelSchema, BaseSchema):

    category = fields.Nested('CategorySchema', only=('type', 'id'))
    sales = fields.Nested('SaleSchema', only=('id', 'title'), many=True)

    @validates_schema
    def check_passwords_match(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)

    class Meta:
        model = User
        exclude = ('password_hash',)
