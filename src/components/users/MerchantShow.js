import React from 'react'
import {Link} from 'react-router-dom'

const MerchantShow = ({business_name, email, hero_image, location, logo, sales}) => {//eslint-disable-line
  return(
    <section>
      <section>
        <div
          className="business-hero"
          style={{backgroundImage: `url(${hero_image})`}}//eslint-disable-line
          alt={business_name}//eslint-disable-line
        >
          <div className="business-logo" style={{backgroundImage: `url(${logo})`}}>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h1 className="title is-4">{business_name/*eslint-disable-line*/}</h1>
              <hr />``
              <p>{email}</p>
              <hr />
              <address>{location}</address>
            </div>
            <div className="column is-half">
              <h1 className="title is-4">SalesHistory</h1>
              <hr />
              {sales.map( sale =>
                <p key= {sale.id}>{sale.title}</p>
              )}
              <hr />
              <Link to="/profile/new-sale">
                <button className="button is-primary">Create a New Sale</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default MerchantShow
