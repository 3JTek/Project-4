# General Assembly Project 4 : Full Stack RESTful App React/Flask/PostgreSQL

### Timeframe

5 days in a group of 2 developers

## Technologies used

* Sytling: HTML5 / SCSS / Bulma
* Front-end: React.js / Webpack / Mapbox-GL / moment.js / react-datepicker
Axios / Promise / FileStack React
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

This application has been designed to provide users with a customised and non spammy type of access to the latest flash sales around them.

Businesses can register and generate temporary sale (flash sale) and choose which customers they want to reach based on the category selected for the sale (distance) and how far they want to reach customer.

Users can also register and provide several categories of product they would be interested in receiving sales. They would also be able to define a location of interest (where they work, where they live) to ensure the sales received are from local businesses.

The notification is received on the user's phone as a text message containing a link to the recently created flash sale. Sale description, address, expiry time... are described to give the user all the relevant information he needs.  

![ezgif com-video-to-gif 2](https://user-images.githubusercontent.com/39668354/52919658-99809900-32fc-11e9-80f1-60f7f3031abf.gif)

---

### Development process

#### Communication

Key point for this project and any project, we met every morning in a quiet room, broadcasting the latest version of the application and discussing about today's priority.

We also tend to work in a 'war zone' kind of mode where we could code next to each other. This allowed rapid decision making process when an issue came up or a design concern was raised.

#### Task management

Working in a group of 2 is a huge advantage as long as each other understand the work that needs to be done. We used Trello quite heavily to create tickets and assigned tasks. Until the MVP, we decided to assign 1 person to build the back-end while the other person would look at how to plug Twilio and other APIs. Once done, we divided the front-end pages between each other and start adding extra features after reaching MVP. We stop coding half a day before project presentation to ensure everything was deployed and working correctly.

#### Branching and Conflict resolution

We use a simplified version of the GitFlow branching system where we basically used 3 different type of branches:

1. Development: this is the main branch where anyone could create feature branches from and merge their work back in. No broken code should never be merged in development since it will affect everyone's code.
2. <feature-branch>: those branches were created by any member of the group in order to develop new features. The branches needed to be named according to the feature developed (i.e. <login-route>).
3. Master: this branch was dedicated to deployment. No commit should never happen in this branch. When a version of the app was ready to be deployed in production (in Heroku), the development branch was merged into master and then pushed ot Heroku.

Conflicts were mitigated by making sure that everyone pulled everyone's changes every morning to avoid long divergent branches. Also, when a conflict occurred, discussion was made between the 2 developers in order to fix the conflict in a way that no information will be lost.

---

### Architecture

Our application is following as much as it can the RESTful paradigm, let's have a look at what is happening when an user is navigating to the index page of the places (destination):

![image](https://user-images.githubusercontent.com/39668354/52906087-31b74900-323d-11e9-83e2-60a596050677.png)

1. An axios request will be sent to our back-end API requesting all the places to be sent back to the front-end:

```
componentDidMount() {
  //If user is logged in, the response will contain only the places
  //that the user doesn't have already in his dashboard
  axios.get('/api/places', {
    headers: Auth.isAuthenticated() ?
      { Authorization: `Bearer ${Auth.getToken()}`} : null
  })
    .then(res => this.setState({ places: res.data }))
}
```

2. Our Express server is using Router to navigate the request toward the right controller.

```
router.route('/places')
  .get((req, res, next) => {
    if(req.headers.authorization) secureRoute(req, res, next)
    else next()
  },placesController.index)
  .post(secureRoute, placesController.create)
  ```

3. The controller will then handle the request and do the logic to get the data from our database:

```
function indexRoute( req, res ){
  Place
    .find()
    .then(places => places.filter(place => {
      if(req.currentUser) {
        //return false if user already added place to his trip
        return !req.currentUser.places.some(userPlace => userPlace.equals(place._id))
      } else return true
    })
    )
    .then(places => res.status(200).json(places))
}
```

4. The model is created as a blueprint of our collection for the place:

```
const placeSchema = new mongoose.Schema({
  name: { type: String, required: 'Name required' },
  country: { type: String, required: 'Country required' },
  image: { type: String, required: 'Image url required' },
  descriptLong: { type: String, required: 'Long description required' },
  descriptShort: { type: String, required: 'Short description required'},
  geog: { type: Array, required: 'Lat/lng required, in array form: [lat, lng]' },
  budget1: { type: String },
  budget2: { type: String },
  budget3: { type: String },
  comments: [ commentSchema ]
})
```

---

### Challenges

* Testing the whole system with all part integrated was difficult since everything changes needed to be deployed in Heroku for the notification URL to point to a web domain (and not localhost).
* Also the sale new page has quite a lot of interconnected elements (map range change will change the price, categories will change the map and the price...) that can update each other which tend to complexify the react lifecycle of this particular page.

---

### Wins

1. 

---

### Future Features / Enhancements

* Allow manual verification of the merchant each time a new merchant signs-in in order to ensure of the quality of the sale generated by those businesses.

* Restrict businesses to lower number of sale categories (1 or 2).

* Send a QR code to along with the notifications to allow the users to redeem their offer.
