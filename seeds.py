from app import app, db
from models.user import UserSchema

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    zara, errors = user_schema.load({
        'email': 'zara@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '1234, test Lane, Test, SE1 1ER',
        'business_name': 'Zara',
        'business_type': 'Fashion',
        'logo': 'zaralogo.png',
        'hero_image': 'zarahero.png',
        'is_merchant': 'True'
    })
    if errors:
        raise Exception(errors)

    zara.save()

    test_user, errors = user_schema.load({
        'email': 'test1@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '1, test avenue, Test, EN5 1ER',
        'phone_number': '+447 000 111 22',
        'category_of_interest': 'Fashion',
        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user.save()
