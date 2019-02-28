import React from 'react'

const MerchantShow = ({business_name, email, hero_image, location, logo, sales}) => {//eslint-disable-line
  return(
    <section>
      <section>
        <div
          className="business-hero"
          style={{backgroundImage: `url(${hero_image})`}}
          alt={business_name}>
          <div className="business-logo" style={{backgroundImage: `url(${logo})`}}>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h1 className="title is-4">{business_name}</h1>
              <hr />
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
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default MerchantShow
