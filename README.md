# General Assembly Project 4 : Full Stack RESTful App React/Flask/PostgreSQL

## Timeframe

5 days in a group of 2 developers

## Technologies used

* Sytling: HTML5 / SCSS / Bulma
* Front-End: React.js / Webpack / Mapbox-GL / moment.js / react-datepicker /
axios / promise
* Unit Testing: Enzyme / Chai / Mocha
* Server: Python / Flask / PostgreSQL / JWT
* Database: PostgreSQL / SQLAlchemy / Marshmallow
* DevOps: Git / GitHub / Heroku

## External APIs

* FileStack.js
* Mapbox Auto Complete
* Twilio (SMS sending service provider)

## Application - Gather - Local Customised Advertising

![image](https://user-images.githubusercontent.com/39668354/53995320-996dff00-412c-11e9-8b88-b0bc218b4e78.png)


You can find a hosted version here ----> [Heroku](https://project-4-gather.herokuapp.com/)

### Overview

This application has been designed to provide users with a customised and non-spammy type of access to the latest flash sales around them.

Businesses can register and then generate temporary sale (flash sale) and choose which customers they want to reach based on:
* The category the sale has been assigned to
* The range (distance) the business wants to reach customers in.

<div style="text-align:center">
  <img src='https://user-images.githubusercontent.com/39668354/54032934-e5f81f80-41aa-11e9-87d5-0499de2e4c22.gif' width=500 />
</div>

Users can also register and provide several categories of product they would be interested in receiving flash sales. They would also be able to define a location of interest (where they work, where they live...) to ensure the sales received are from local businesses.

The notification is received on the user's phone as a text message containing a link to the recently created flash sale. Sale description, address, expiry time... are described to give the user all the relevant information he needs.  

<div style="text-align:center">
  <img src='https://user-images.githubusercontent.com/39668354/54071492-ff5da200-4264-11e9-971f-edbfc0e7cb16.gif' width=200 />
</div>

---

### Development process

#### Communication

Key point for this project and any project, we met every morning in a quiet room, broadcasting the latest version of the application and discussed about today's priorities.

We also tend to work in a 'war zone' kind of mode where we could code next to each other. This allowed rapid decision making process when an issue came up or a design concern was raised.

#### Task management

Working in a group of 2 is a huge advantage as long as each other understand the work that needs to be done. We used Trello quite heavily to create tickets and assigned tasks. Until the MVP, we decided to assign 1 person to build the back-end while the other person would look at how to plug Twilio and other APIs.
Once done, we divided the front-end pages between each others and start adding extra features.
IMPORTANT: we stopped coding half a day before project presentation to ensure everything was deployed and working correctly.

#### Branching and Conflict resolution

We used a simplified version of the GitFlow branching system where we basically used 3 different types of branches:

1. Development: this is the main branch where anyone could create feature branches from and merge their work back in. No broken code should never be merged in development since it will affect everyone's code.
2. 'feature-branches': those branches were created by any member of the group in order to develop new features. The branches needed to be named according to the feature developed (i.e. 'login-route').
3. Master: this branch was dedicated to deployment. No commit should never happen in this branch. When a version of the app was ready to be deployed in production (in Heroku), the development branch was merged into master and then pushed to Heroku.

Conflicts were mitigated by making sure that everyone pulled everyone's changes every morning to avoid long divergent branches. Also, when a conflict occurred, discussion was made between the 2 developers in order to fix the conflict in a way that no information will be lost.

---

### Tech Solution

Our application is following as much as it can the RESTful paradigm, let's have a look at what is happening when the "new sale" page is loaded:

<div style="text-align:center">
  <img src='https://user-images.githubusercontent.com/39668354/54035135-8ac92b80-41b0-11e9-9299-dfb567925726.png' width=500 />
</div>

---

1. Two axios requests are sent within a Promise to our back-end API requesting all existing categories and customers from our databse:

```
componentDidMount(){
  Promise.props({
    categories: axios('/api/categories').then(res => res.data),
    customers: axios('/api/users?customers_only=true').then(res => res.data)
  })
    .then(data => {
      this.calculDistanceFromBusiness(data.customers)
      this.setState({...data})
    })
}
```

2. Our Flask server receives the GET request on the "users" endpoint and returns only the users that are customers not merchants (businesses).

```
@api.route('/users', methods=['GET'])
def user_index():

    #Check if there is a query string to only return customers (not merchants)
    parsed = urlparse(request.url)

    if parse_qs(parsed.query) != {'customers_only':['true']}:
        users = User.query.all()
    else:
        users = User.query.filter_by(is_merchant=False)

    return users_schema.jsonify(users)
```

3. Once the data sent back to the front-end, the calculDistanceFromBusiness function will be called to calculate the distance from the business for each customer.  

```
calculDistanceFromBusiness(customers){
  this.customersDistance = customers.map(customer => {
    console.log(this.state)
    const businessLat = this.state.newSale.user.lat
    const businessLng = this.state.newSale.user.lng
    const {lat, lng} = customer
    const lngDiff = Math.abs(lng - businessLng)
    const latDiff = Math.abs(lat - businessLat)
    const kmX = lngDiff * (111.320*Math.cos(businessLat*Math.PI/180))
    const kmY = latDiff * 110.574
    return Math.sqrt(Math.pow(kmX,2) + Math.pow(kmY,2))
  })
}
```

4. Finally, a last function is called to defined which customers will be notified of the sale:

```
customersToContact(){
  return this.customersDistance.reduce((newArray, distance, index) => {
    if(distance <= this.state.saleRadius){
      //Return an array of category ids for each customer
      const customerCategoryIds = this.state.customers[index]
        .categories.map(category => category.id)
      //Compare the above array to the sale category
      if(customerCategoryIds.includes(this.state.newSale.category.id)){
        return newArray.concat(this.state.customers[index])
      }
    }
    return newArray
  },[])
}
```

---

### Challenges

* Testing the message notification form a mobile phone was complex since any change needed to be deployed in Heroku for the notification URL to point to a web domain (and not localhost).

* Also the sale new page has quite a lot of interconnected elements (map range changes will impact the price, categories will change map and pricing...) which tends to complexify the react lifecycle of this particular page.

---

### Wins

1. We managed to keep the database architecture as simple as possible with only 3 models (users, categories and sale).
2. We also combined merchant (business) and customer accounts within the same model simply adding a flag "is_merchant" to differentiate them.

---

### Future Features / Enhancements

* Allow manual verification each time a new merchant signs-in in order to ensure the quality of the sales generated from those businesses.

* Restrict businesses to lower number of categories they can raise sales against (1 or 2).

* Send a QR code along with the notification to allow the users to redeem their offer.
