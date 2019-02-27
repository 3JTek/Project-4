from app import app, db
from models.user import UserSchema
from models.category import Category

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    #Category seeds.........................................
    fashion = Category(type='Fashion')
    fashion.save()
    lunch = Category(type='Lunch')
    lunch.save()
    shopping = Category(type='Shopping')
    shopping.save()
    clothes = Category(type='Clothes')
    clothes.save()
    sport = Category(type='Sport')
    sport.save()
    sandwiches = Category(type='Sandwiches')
    sandwiches.save()
    steak = Category(type='Steak')
    steak.save()
    womens_clothes = Category(type='Womens Clothes')
    womens_clothes.save()
    mens_clothes = Category(type='Mens Clothes')
    mens_clothes.save()
    shoes = Category(type='Shoes')
    shoes.save()
    electronics = Category(type='Electronics')
    electronics.save()
    leisure = Category(type='Leisure')
    leisure.save()
    beauty = Category(type='Beauty')
    beauty.save()
    coffee = Category(type='Coffee')
    coffee.save()



    zara, errors = user_schema.load({
        'email': 'zara@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '1234, test Lane, Test, SE1 1ER',
        'business_name': 'Zara',
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
        'location': '1 test avenue, Test, EN5 1ER',
        'phone_number': '+447 000 111 22',
        'category': {
            'id': '1',
            'type': 'Fashion'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user.save()

    test_user2, errors = user_schema.load({
        'email': 'test2@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '2 test avenue, Test, N1 1DR',
        'phone_number': '+447 000222333',
        'category': {
            'id': '14',
            'type': 'Coffee'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user2.save()

    test_user3, errors = user_schema.load({
        'email': 'test3@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '3 test avenue, Test, N1 1DR',
        'phone_number': '+447 000333444',
        'category': {
            'id': '12',
            'type': 'Leisure'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user3.save()

    test_user4, errors = user_schema.load({
        'email': 'test4@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'phone_number': '+447 123454322',
        'category': {
            'id': '5',
            'type': 'Sport'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user4.save()
