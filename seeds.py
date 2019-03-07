#Pylint: disable=C0302
from app import app, db
from models.user import UserSchema
from models.category import Category
from models.sale import Sale

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    #Category seeds.........................................
    lunch = Category(type='Lunch', logo='assets/cupcake.png')
    lunch.save()
    coffee = Category(type='Coffee', logo='assets/coffee.png')
    coffee.save()
    food = Category(type='Food', logo='assets/cutlery.png')
    food.save()
    shopping = Category(type='Shopping', logo='assets/shopping-bag.png')
    shopping.save()
    fitness = Category(type='Fitness', logo='assets/weightlifting.png')
    fitness.save()
    entertainment = Category(type='Entertainment', logo='assets/ticket.png')
    entertainment.save()
    plants = Category(type='Plants', logo='assets/plant.png')
    plants.save()
    bars = Category(type='Bars', logo='assets/glass.png')
    bars.save()
    clothes = Category(type='Clothes', logo='assets/hanger.png')
    clothes.save()
    womens_clothes = Category(type='Womens Clothes', logo='assets/slit-skirt.png')
    womens_clothes.save()
    mens_clothes = Category(type='Mens Clothes', logo='assets/shirt.png')
    mens_clothes.save()
    shoes = Category(type='Shoes', logo='assets/high-heels.png')
    shoes.save()
    wellbeing = Category(type='Well-being', logo='assets/meditation.png')
    wellbeing.save()
    beauty = Category(type='Beauty', logo='assets/make-up.png')
    beauty.save()
    electronics = Category(type='Electronics', logo='assets/screen.png')
    electronics.save()

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
        'business_name': 'joe & the juice',
        'lng': '-0.118092',
        'lat': '51.509865',
        'logo': 'https://s2.qwant.com/thumbr/0x380/e/0/50f0bf00c902968003bb1bac8cc9e9b68304fe9ec8288ffd757385af1d4de9/joe_and_the_juice.jpg?u=http%3A%2F%2Fmollyinadomi.files.wordpress.com%2F2011%2F12%2Fjoe_and_the_juice.jpg&q=0&b=1&p=0&a=1',
        'hero_image': 'https://s2.qwant.com/thumbr/0x380/d/0/6181666fa0316130aeb1591ca556e80cb99b3c5f8c0507c0d6a63c88fd39c7/img_3546-1.jpg?u=https%3A%2F%2Fwww.joejuice.com%2Fmedia%2F2196%2Fimg_3546-1.jpg&q=0&b=1&p=0&a=1',
        'is_merchant': 'True'
    })
    if errors:
        raise Exception(errors)

    joe_and_the_juice.save()

    tom_abbott, errors = user_schema.load({
        'email': 'tom@test.com',
        'password': 'password',
        'password_confirmation': 'password',
        'location': '1 test avenue, Test, EN5 1ER',
        'lat': '51.51109304763886',
        'lng': '-0.072097946289090',
        'phone_number': '+447 525 367 740',
        'categories': [{'id':4}],

        'is_merchant': 'False'
    })
    if errors:
        raise Exception(errors)

    tom_abbott.save()

test_user, errors = user_schema.load({
    'email': 'test1@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '1 test avenue, Test, EN5 1ER',
    'lat': '51.507877',
    'lng': '-0.087732',
    'phone_number': '+447 000 111 22',
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],
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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user20.save()

test_user22, errors = user_schema.load({
    'email': 'test22@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.47240210394',
    'lng': '-0.16479508984',
    'phone_number': '+447 123454322',
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'lng': '-0.13294599609659',
    'phone_number': '+447 123454322',
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],
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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],
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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

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
    'categories': [{'id':4}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user5.save()

test_user51, errors = user_schema.load({
    'email': 'test51@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.467643209899375',
    'lng': '-0.1344560102539347',
    'phone_number': '+447 123454322',
    'categories': [{'id':4}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user51.save()

test_user52, errors = user_schema.load({
    'email': 'test52@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.516434519838255',
    'lng': '-0.08703248608401282',
    'phone_number': '+447 123454322',
    'categories': [{'id':4}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user52.save()

test_user53, errors = user_schema.load({
    'email': 'test53@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.46769709899375',
    'lng': '-0.08703248608401282',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user53.save()

test_user54, errors = user_schema.load({
    'email': 'test54@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51547310106586',
    'lng': '-0.0886632691650675',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user54.save()

test_user55, errors = user_schema.load({
    'email': 'test55@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.516381108216635',
    'lng': '-0.08437173474123938',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user55.save()

test_user56, errors = user_schema.load({
    'email': 'test56@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.515366275505194',
    'lng': '-0.1340102539347',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user56.save()

test_user57, errors = user_schema.load({
    'email': 'test57@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51264213905837',
    'lng': '-0.086345840576200327',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user57.save()

test_user58, errors = user_schema.load({
    'email': 'test58@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51611404916894',
    'lng': '-0.09080903637698157',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user58.save()

test_user59, errors = user_schema.load({
    'email': 'test59@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51280238688842',
    'lng': '-0.082998443725614387',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user59.save()

test_user60, errors = user_schema.load({
    'email': 'test60@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51766296984969',
    'lng': '-0.08282678234866125',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user60.save()

test_user61, errors = user_schema.load({
    'email': 'test61@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '6 test avenue, Test, SW6 1GA',
    'lat': '51.51023835396243',
    'lng': '-0.08351342785647375',
    'phone_number': '+447 123464322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user61.save()

test_user62, errors = user_schema.load({
    'email': 'test62@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.509971258900165',
    'lng': '-0.08402841198733313',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user62.save()

test_user63, errors = user_schema.load({
    'email': 'tesr63@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50740706662929',
    'lng': '-0.0969030152588175',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user63.save()

test_user64, errors = user_schema.load({
    'email': 'test64@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51018493507536',
    'lng': '-0.07398622143557532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user64.save()

test_user65, errors = user_schema.load({
    'email': 'test65@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51659475432759',
    'lng': '-0.08686082470705969',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user65.save()

test_user66, errors = user_schema.load({
    'email': 'test66@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.5088494425391',
    'lng': '-0.06540315258791907',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user66.save()

test_user67, errors = user_schema.load({
    'email': 'test67@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.52273665145818',
    'lng': '-0.06299989331057532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user67.save()

test_user68, errors = user_schema.load({
    'email': 'test68@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50158367738975',
    'lng': '-0.15260713208010657',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user68.save()

test_user69, errors = user_schema.load({
    'email': 'test69@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51290921846213',
    'lng': '-0.16908662426760657',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user69.save()

test_user70, errors = user_schema.load({
    'email': 'test70@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.53512474041398',
    'lng': '-0.13132112133791907',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user70.save()

test_user71, errors = user_schema.load({
    'email': 'test71@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.512481890664816',
    'lng': '-0.11312501538088782',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user71.save()

test_user72, errors = user_schema.load({
    'email': 'test72@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.5079947067713',
    'lng': '-0.09973542797854407',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user72.save()

test_user73, errors = user_schema.load({
    'email': 'test73@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.49730915668586',
    'lng': '-0.10419862377932532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user73.save()

test_user74, errors = user_schema.load({
    'email': 'test74@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.48405559466516',
    'lng': '-0.11587159741213782',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user74.save()

test_user75, errors = user_schema.load({
    'email': 'test75@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50265224492529',
    'lng': '-0.10522859204104407',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user75.save()

test_user76, errors = user_schema.load({
    'email': 'test76@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50799470677127',
    'lng': '-0.08119599926760657',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user76.save()

test_user77, errors = user_schema.load({
    'email': 'test77@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.51632769653253',
    'lng': '-0.06814973461916907',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user77.save()

test_user78, errors = user_schema.load({
    'email': 'test78@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50607149266552',
    'lng': '-0.05819337475588782',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user78.save()

test_user79, errors = user_schema.load({
    'email': 'test79@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.484055594665136',
    'lng': '-0.11175172436526282',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user79.save()

test_user80, errors = user_schema.load({
    'email': 'test80@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.483200393838025',
    'lng': '-0.05750672924807532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user80.save()

test_user81, errors = user_schema.load({
    'email': 'tesr81@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.52230941585488',
    'lng': '-0.03278749096682532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user81.save()

test_user82, errors = user_schema.load({
    'email': 'test82@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50436190086636',
    'lng': '-0.078106094482450327',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user82.save()

test_user83, errors = user_schema.load({
    'email': 'test83@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.488117579576205',
    'lng': '-0.06162660229495032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user83.save()

test_user84, errors = user_schema.load({
    'email': 'test84@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.511199883221295',
    'lng': '-0.08222596752932532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user84.save()

test_user85, errors = user_schema.load({
    'email': 'test85@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.511199883221295',
    'lng': '-0.06711976635745032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user85.save()

test_user86, errors = user_schema.load({
    'email': 'test86@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.49239296225168',
    'lng': '-0.0575067292480753',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user86.save()

test_user87, errors = user_schema.load({
    'email': 'test87@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.5163276965326',
    'lng': '-0.05888002026370032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user87.save()

test_user88, errors = user_schema.load({
    'email': 'test88@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.494957999412094',
    'lng': '-0.07261293041995032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user88.save()

test_user89, errors = user_schema.load({
    'email': 'test89@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.49752289224251',
    'lng': '-0.134925302539347',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user89.save()

test_user90, errors = user_schema.load({
    'email': 'test90@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.49752289224251',
    'lng': '-0.113811660888700327',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user90.save()

test_user91, errors = user_schema.load({
    'email': 'test91@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.491537917791014',
    'lng': '-0.04789369213870032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user91.save()

test_user92, errors = user_schema.load({
    'email': 'test92@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.52060043335867',
    'lng': '-0.06299989331057532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user92.save()

test_user93, errors = user_schema.load({
    'email': 'test93@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.506926264512316',
    'lng': '-0.09595887768557532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user93.save()

test_user94, errors = user_schema.load({
    'email': 'test94@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.50094252484161',
    'lng': '-0.10831849682620032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user94.save()

test_user95, errors = user_schema.load({
    'email': 'test95@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.481276133337165',
    'lng': '-0.07123963940432532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user95.save()

test_user96, errors = user_schema.load({
    'email': 'test96@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.477855025298815',
    'lng': '-0.09733216870120032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user96.save()

test_user97, errors = user_schema.load({
    'email': 'test97@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.49324799067537',
    'lng': '-0.10145204174807532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user97.save()

test_user98, errors = user_schema.load({
    'email': 'test98@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.512054558858985',
    'lng': '-0.087719131591825327',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user98.save()

test_user99, errors = user_schema.load({
    'email': 'test99@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.49837782444656',
    'lng': '-0.10831849682620032',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user99.save()

test_user100, errors = user_schema.load({
    'email': 'test100@test.com',
    'password': 'password',
    'password_confirmation': 'password',
    'location': '5 test avenue, Test, SW5 1GA',
    'lat': '51.512909218462184',
    'lng': '-0.08771913159182532',
    'phone_number': '+447 123454322',
    'categories': [{'id':2}],

    'is_merchant': 'False'
})
if errors:
    raise Exception(errors)

test_user100.save()


flash_sale_1 = Sale(
    user=joe_and_the_juice,
    title='Half price coffee',
    expiry_date='2019-05-01 9:22:54',
    content='For three hours only, we will be serving the best coffee for half price',
    category=coffee
    )

flash_sale_1.save()

flash_sale_2 = Sale(
    user=zara,
    title='Winter collection 50% Off',
    expiry_date='2019-03-03 18:25:27',
    content='Come and enjoy the latest winter collection at a ridiculous price!!! ',
    category=womens_clothes
    )

flash_sale_2.save()
