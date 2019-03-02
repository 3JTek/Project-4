import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return(
    <section className="section">
      <div className="container">
        <div className="home-hero">
          <h1>The best sales should find you</h1>
        </div>
        <Link to={'/register'}>
          <h1>Register as Merchant</h1>
        </Link>
        <Link to={'/signup'}>
          <h1>Sign up as a Customer</h1>
        </ Link>
      </div>
    </section>
  )
}

export default Home
