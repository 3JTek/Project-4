from app import app, db
from models.merchant import Merchant


with app.app_context():
    db.drop_all()
    db.create_all()

    joe_and_the_juice = Merchant(name='Joe & the Juice')
    joe_and_the_juice.save()

    zara = Merchant(name='Zara')
    zara.save()
