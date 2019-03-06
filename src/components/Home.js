import React from 'react'
// import Auth from '../lib/Auth'
// import UserProfile from '../users/UserProfile'
import {  withRouter, Link } from 'react-router-dom'


const Home = () => {
  // if (Auth.isAuthenticated()) return <UserProfile/>
  return(
    <div className="home-hero">
      <div className="container">
        <h2>the best <span id="home-sale">sales</span> should find you</h2>
        <div className="sign-up">
          <Link to={'/register'}>
            <h3>Register as Mercant</h3>
          </Link>
          <Link to={'/signup'}>
            <h3>sign up as a customer</h3>
          </ Link>
        </div>
      </div>
    </div>

  )
}

export default withRouter(Home)
