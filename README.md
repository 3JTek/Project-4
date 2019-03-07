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

Working in a group of 3 is a huge advantage as long as each other understand the work that needs to be done. We used Trello quite heavily to create tickets and assigned tasks. Until the MVP and as we were 3 in the team, we decided to assign 1 person to build the back-end, 1 person to build the front-end and 1 person to try new technologies that we wanted to use in our version 2.0 (fully featured product).

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

* Free APIs for daily budget in each country was hard to find, we were looking for the BigMac and Cock index type of API to give the user an idea of cost of living.

---

### Wins

1. Team organisation: daily stand-up, daily merging of each other branch and democratic decision has allowed the team to move forward at a great speed without wasting time fixing conflic, arguing features or diverging back-end and front-end development. We kept in sync during all time and this greatly impact the productivity and the atmosphere in the team.

2. Use of the Authentication helper method that allow the application to render pages differently according to if the user is logged-in or not i.e. in the show page, we only show current weather, tweets and comments if the user is logged in. This allow to use the same route api/pages and api/pages/:id for any scenario.

3. The drawing line on the map was quite a challenge since every point had to be calculated for each increment [X (latitude), Y (longitude)]. The idea was to use the tan(O) = opposite / adjacent trigonometric formula to find, for each time we increment X, the corresponding Y point.  

---

### Future Features / Enhancements

* The "place" model which contains all the information about a single destination in the MongoDB could have a user field which could be used to know who already chose this destination. The idea is that we could display what other users are currently interested by this place and potentially connect them together.

* Email validation and password reset.

* Option for the user to add a place of his choice (which might not be part of the main index list that our service proposes).

* More information on the dashboard about the overall trip, total cost estimation, time in weeks, trip lenght in Km...
