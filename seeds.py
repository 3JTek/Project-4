from app import app, db
from models.user import UserSchema
from models.category import Category
from models.sale import Sale

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
        'lng': '-0.118092',
        'lat': '51.509865',
        'business_name': 'Zara',
        'logo': 'https://s2.qwant.com/thumbr/0x0/e/c/2cfc32d78af019faaed18632e1db55657c26b39c69c32de0191f26062ef778/Zara_logo_website.png?u=https%3A%2F%2Fwww.waldengalleria.com%2Fwp-content%2Fuploads%2Fsites%2F3%2F2017%2F03%2FZara_logo_website.png&q=0&b=1&p=0&a=1',
        'hero_image': 'https://s1.qwant.com/thumbr/0x380/3/0/2224b1ba7031bf11772048fdc8a35c6837d967a2689e827fe5cfd6c516d185/visite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg?u=http%3A%2F%2Fi.f1g.fr%2Fmedia%2Fext%2F1900x1900%2Fmadame.lefigaro.fr%2Fsites%2Fdefault%2Ffiles%2Fimg%2F2017%2F04%2Fvisite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg&q=0&b=1&p=0&a=1',
        'is_merchant': 'True'
    })
    if errors:
        raise Exception(errors)

    zara.save()

    joe_and_the_juice, errors = user_schema.load({
        'email': 'jatj@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5, merchant Lane, merchant, SW4 1GA',
        'business_name': 'Joe & the Juice',
        'lng': '-0.118092',
        'lat': '51.509865',
        'logo': 'https://s2.qwant.com/thumbr/0x380/e/0/50f0bf00c902968003bb1bac8cc9e9b68304fe9ec8288ffd757385af1d4de9/joe_and_the_juice.jpg?u=http%3A%2F%2Fmollyinadomi.files.wordpress.com%2F2011%2F12%2Fjoe_and_the_juice.jpg&q=0&b=1&p=0&a=1',
        'hero_image': 'https://s1.qwant.com/thumbr/0x380/2/d/ba333ce18be0b1fe4daf65b39eb2814bfb250dc9cfb0711d364ec345cd520c/171025-joe-and-the-juice-london.jpg?u=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2017%2F10%2F171025-joe-and-the-juice-london.jpg&q=0&b=1&p=0&a=1',
        'is_merchant': 'True'
    })
    if errors:
        raise Exception(errors)

    joe_and_the_juice.save()

    test_user, errors = user_schema.load({
        'email': 'test1@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '1 test avenue, Test, EN5 1ER',
        'phone_number': '+447 000 111 22',
        'category': {
            'id': '14',
            'type': 'Coffee'
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

    flash_sale_1 = Sale(
    user=joe_and_the_juice,
    title='Half price coffee',
    expiry_date='2019-05-01 9:22:54',
    content='For three hours only, we will be serving the best coffee for half price',
    sale_fees=300,
    category=coffee
    )

    flash_sale_1.save()

    flash_sale_2 = Sale(
    user=zara,
    title='Winter collection 50% Off',
    expiry_date='2019-03-03 18:25:27',
    content='Come and enjoy the latest winter collection at a ridiculous price!!! ',
    sale_fees=213,
    category=womens_clothes
    )

    flash_sale_2.save()
