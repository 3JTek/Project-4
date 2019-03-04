import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return(

    <div className="home-hero">
      <div className="container">
        <h2>the best <span id="home-sale">sales</span> should find you</h2>
        <div className="sign-up">
          <Link to={'/register'}>
            <h3>Register as Merchant</h3>
          </Link>
          <Link to={'/signup'}>
            <h3>sign up as a customer</h3>
          </ Link>
        </div>
      </div>
    </div>

  )
}

export default Home
