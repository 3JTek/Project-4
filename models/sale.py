from app import db, ma
from .base import BaseModel, BaseSchema

class Sale(db.Model, BaseModel):

    __tablename__ = 'sales'

    title = db.Column(db.String(40), nullable=False)
    content = db.Column(db.String(512), nullable=False)
    expiry_date = db.Column(db.String(40), nullable=False)
    sale_fees = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(40), nullable=False)

class SaleSchema(ma.ModelSchema, BaseSchema):

    class Meta:
        model = Sale
