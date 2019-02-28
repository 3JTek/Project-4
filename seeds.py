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
    bars = Category(type='Bars')
    bars.save()
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
    food = Category(type='Food')
    food.save()



    zara, errors = user_schema.load({
        'email': 'zara@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '1234, test Lane, Test, SE1 1ER',
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
        'lat': '51.507877',
        'lng': '-0.087732',
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
        'lat': '51.510960',
        'lng': '-0.075130',
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
        'lat': '51.537430',
        'lng': '-0.125250',
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
        'lat': '51.507565',
        'lng': '-0.127500',
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

    test_user6, errors = user_schema.load({
        'email': 'test6@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.367565',
        'lng': '-0.128570',
        'phone_number': '+447 123454322',
        'category': {
            'id': '5',
            'type': 'Sport'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user6.save()

    test_user7, errors = user_schema.load({
        'email': 'test7@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.535231',
        'lng': '-0.108490',
        'phone_number': '+447 123454322',
        'category': {
            'id': '1',
            'type': 'Fashion'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user7.save()

    test_user8, errors = user_schema.load({
        'email': 'test8@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.533950',
        'lng': '-0.1208497',
        'phone_number': '+447 123454322',
        'category': {
            'id': '1',
            'type': 'Fashion'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user8.save()

    test_user9, errors = user_schema.load({
        'email': 'test9@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.506178',
        'lng': '-0.102310',
        'phone_number': '+447 123454322',
        'category': {
            'id': '2',
            'type': 'Lunch'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user9.save()

    test_user10, errors = user_schema.load({
        'email': 'test10@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.507565',
        'lng': '-0.127500',
        'phone_number': '+447 123454322',
        'category': {
            'id': '2',
            'type': 'Lunch'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user10.save()

    test_user11, errors = user_schema.load({
        'email': 'test11@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.5027591',
        'lng': '-0.09544334',
        'phone_number': '+447 123454322',
        'category': {
            'id': '3',
            'type': 'Shopping'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user11.save()

    test_user12, errors = user_schema.load({
        'email': 'test12@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.46898033',
        'lng': '-0.1043702',
        'phone_number': '+447 123454322',
        'category': {
            'id': '3',
            'type': 'Shopping'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user12.save()

    test_user13, errors = user_schema.load({
        'email': 'test13@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '13 test avenue, Test, SW5 1GA',
        'lat': '51.4689803',
        'lng': '-0.1160432',
        'phone_number': '+1347 123454322',
        'category': {
            'id': '4',
            'type': 'Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user13.save()

    test_user14, errors = user_schema.load({
        'email': 'test14@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '4 test avenue, Test, SW5 1GA',
        'lat': '51.454007052',
        'lng': '-0.1318361054',
        'phone_number': '+447 123454322',
        'category': {
            'id': '4',
            'type': 'Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user14.save()

    test_user15, errors = user_schema.load({
        'email': 'test15@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.45101180786',
        'lng': '-0.1558686982',
        'phone_number': '+447 123454322',
        'category': {
            'id': '6',
            'type': 'Sandwiches'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user15.save()

    test_user16, errors = user_schema.load({
        'email': 'test16@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.471974396',
        'lng': '-0.203933883789',
        'phone_number': '+447 123454322',
        'category': {
            'id': '6',
            'type': 'Sandwiches'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user16.save()

    test_user17, errors = user_schema.load({
        'email': 'test17@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.4869417790',
        'lng': '-0.204620529296',
        'phone_number': '+447 123454322',
        'category': {
            'id': '6',
            'type': 'Sandwiches'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user17.save()

    test_user18, errors = user_schema.load({
        'email': 'test18@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '18 test avenue, Test, SW5 1GA',
        'lat': '51.492072322',
        'lng': '-0.223159958007',
        'phone_number': '+447 123454322',
        'category': {
            'id': '7',
            'type': 'Bars'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user18.save()

    test_user19, errors = user_schema.load({
        'email': 'test19@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.43474847721',
        'lng': '-0.188827682617',
        'phone_number': '+447 123454322',
        'category': {
            'id': '7',
            'type': 'Bars'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user19.save()

    test_user20, errors = user_schema.load({
        'email': 'test20@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.4347484772',
        'lng': '-0.0954438935547',
        'phone_number': '+447 123454322',
        'category': {
            'id': '7',
            'type': 'Bars'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user20.save()

    test_user21, errors = user_schema.load({
        'email': 'test21@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.4681248467',
        'lng': '-0.1400758515625',
        'phone_number': '+447 123454322',
        'category': {
            'id': '8',
            'type': 'Womens Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user21.save()

    test_user22, errors = user_schema.load({
        'email': 'test22@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.47240210394',
        'lng': '-0.16479508984',
        'phone_number': '+447 123454322',
        'category': {
            'id': '8',
            'type': 'Womens Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user22.save()

    test_user23, errors = user_schema.load({
        'email': 'test23@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.4907897407',
        'lng': '-0.15380876171877',
        'phone_number': '+447 123454322',
        'category': {
            'id': '8',
            'type': 'Womens Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user23.save()

    test_user24, errors = user_schema.load({
        'email': 'test24@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.49463737766',
        'lng': '-0.22453324902346',
        'phone_number': '+447 123454322',
        'category': {
            'id': '9',
            'type': 'Mens Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user24.save()

    test_user25, errors = user_schema.load({
        'email': 'test25@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.52198898623',
        'lng': '-0.1984407197265909',
        'phone_number': '+447 123454322',
        'category': {
            'id': '9',
            'type': 'Mens Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user25.save()

    test_user26, errors = user_schema.load({
        'email': 'test26@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.49634733427764',
        'lng': '-0.191574264648465',
        'phone_number': '+447 123454322',
        'category': {
            'id': '9',
            'type': 'Mens Clothes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user26.save()

    test_user27, errors = user_schema.load({
        'email': 'test27@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.517716379968',
        'lng': '-0.032272506835965',
        'phone_number': '+447 123454322',
        'category': {
            'id': '10',
            'type': 'Shoes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user27.save()

    test_user28, errors = user_schema.load({
        'email': 'test28@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.50746048877',
        'lng': '0.03913862597653',
        'phone_number': '+447 123454322',
        'category': {
            'id': '10',
            'type': 'Shoes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user28.save()

    test_user29, errors = user_schema.load({
        'email': 'test29@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.521988986522',
        'lng': '-0.0048066865234659',
        'phone_number': '+447 123454322',
        'category': {
            'id': '10',
            'type': 'Shoes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user29.save()

    test_user30, errors = user_schema.load({
        'email': 'test30@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.51942547069028',
        'lng': '-0.0569917451172159',
        'phone_number': '+447 123454322',
        'category': {
            'id': '10',
            'type': 'Shoes'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user30.save()

    test_user31, errors = user_schema.load({
        'email': 'test31@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.517716379968',
        'lng': '-0.0775911103515909',
        'phone_number': '+447 123454322',
        'category': {
            'id': '11',
            'type': 'Electronics'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user31.save()

    test_user32, errors = user_schema.load({
        'email': 'test32@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.50575094908906',
        'lng': '-0.0968171845703409',
        'phone_number': '+447 123454322',
        'category': {
            'id': '11',
            'type': 'Electronics'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user32.save()

    test_user33, errors = user_schema.load({
        'email': 'test33@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.536512850684616',
        'lng': '-0.1311494599609659',
        'phone_number': '+447 123454322',
        'category': {
            'id': '11',
            'type': 'Electronics'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user33.save()

    test_user34, errors = user_schema.load({
        'email': 'test34@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.52198898652206',
        'lng': '-0.1407624970703409',
        'phone_number': '+447 123454322',
        'category': {
            'id': '11',
            'type': 'Electronics'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user34.save()

    test_user35, errors = user_schema.load({
        'email': 'test35@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.51258872299006',
        'lng': '-0.0940706025390904',
        'phone_number': '+447 123454322',
        'category': {
            'id': '12',
            'type': 'Leisure'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user35.save()

    test_user36, errors = user_schema.load({
        'email': 'test36@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.50404134526334',
        'lng': '-0.07347123730471594',
        'phone_number': '+447 123454322',
        'category': {
            'id': '12',
            'type': 'Leisure'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user36.save()

    test_user37, errors = user_schema.load({
        'email': 'test37@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.5142980061192',
        'lng': '-0.0968171845703409',
        'phone_number': '+447 123454322',
        'category': {
            'id': '13',
            'type': 'Beauty'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user37.save()

    test_user38, errors = user_schema.load({
        'email': 'test38@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.50062194518504',
        'lng': '-0.11055009472659094',
        'phone_number': '+447 123454322',
        'category': {
            'id': '13',
            'type': 'Beauty'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user38.save()

    test_user39, errors = user_schema.load({
        'email': 'test39@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.517716379968476',
        'lng': '-0.1366426240234659',
        'phone_number': '+447 123454322',
        'category': {
            'id': '14',
            'type': 'Coffee'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user39.save()

    test_user40, errors = user_schema.load({
        'email': 'test40@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.515152623632524',
        'lng': '-0.1311494599609659',
        'phone_number': '+447 123454322',
        'category': {
            'id': '14',
            'type': 'Coffee'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user40.save()

    test_user41, errors = user_schema.load({
        'email': 'test41@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.48352109602779',
        'lng': '-0.1709748994140909',
        'phone_number': '+447 123454322',
        'category': {
            'id': '14',
            'type': 'Coffee'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user41.save()

    test_user42, errors = user_schema.load({
        'email': 'test42@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.47582362098229',
        'lng': '-0.0940706025390909',
        'phone_number': '+447 123454322',
        'category': {
            'id': '14',
            'type': 'Coffee'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user42.save()

    test_user43, errors = user_schema.load({
        'email': 'test43@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.52369791691055',
        'lng': '-0.1500322114258097',
        'phone_number': '+447 123454322',
        'category': {
            'id': '14',
            'type': 'Coffee'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user43.save()

    test_user44, errors = user_schema.load({
        'email': 'test44@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.50703310986577',
        'lng': '-0.1589586030273722',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user44.save()

    test_user45, errors = user_schema.load({
        'email': 'test45@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.51686181055704',
        'lng': '-0.06351487744143469',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user45.save()

    test_user46, errors = user_schema.load({
        'email': 'test46@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.51515262363254',
        'lng': '-0.09716050732424719',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user46.save()

    test_user47, errors = user_schema.load({
        'email': 'test47@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.52198898652209',
        'lng': '-0.05596177685549719',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user47.save()

    test_user48, errors = user_schema.load({
        'email': 'test48@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.51173405737399',
        'lng': '-0.0233461152344034',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user48.save()

    test_user49, errors = user_schema.load({
        'email': 'test49@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.517716379968505',
        'lng': '-0.136299301269559',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user49.save()

    test_user50, errors = user_schema.load({
        'email': 'test50@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.46769709899375',
        'lng': '-0.1349260102539347',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user50.save()

    test_user5, errors = user_schema.load({
        'email': 'test5@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '5 test avenue, Test, SW5 1GA',
        'lat': '51.457002101',
        'lng': '-0.110550094',
        'phone_number': '+447 123454322',
        'category': {
            'id': '15',
            'type': 'Food'
        },

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    test_user5.save()

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
