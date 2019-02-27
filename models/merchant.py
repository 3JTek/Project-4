from app import db, ma
from .base import Basemodel, BaseSchema

class Merchant(db.Model, Basemodel):

    __tablename__ = 'merchants'

    name = db.Column(db.String(40), nullable=False)

class MerchantSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Merchant
