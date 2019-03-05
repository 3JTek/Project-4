import React from 'react'
import {Link} from 'react-router-dom'

const MerchantShow = (props) => {

  const {categories, business_name, email, hero_image, location, logo, sales} = props //eslint-disable-line
  const currentSale = sales.filter(sale => new Date(sale.expiry_date) - Date.now() > 0)
  const pastSale = sales.filter(sale => new Date(sale.expiry_date) - Date.now() < 0)

  return(
    <section>
      <section>
        <div
          className="business-hero"
          style={{backgroundImage: `url(${hero_image})`}}//eslint-disable-line
          alt={business_name}//eslint-disable-line
        >
          <div className="business-logo" style={{backgroundImage: `url(${logo})`}} alt='Business logo'>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <h1 className="title is-4 business-name">{business_name/*eslint-disable-line*/}</h1>
              <hr />
              <h5 className="email">{email}</h5>
              <hr />
              <h5 className="address">{location}</h5>
            </div>
            <div className="column is-quarter">
              <h1 className="title is-4 active-sales">current sales</h1>
              {currentSale.map( sale =>
                <Link
                  key= {sale.id}
                  to={`/sales/${sale.id}/${sale.title.replace(/%/g,'percent').replace(/ /g,'-')}`}>
                  <h4>{sale.title}</h4>
                </Link>
              )}
              <hr />
              <h1 className="title is-4 past-sales">sAles history</h1>
              {pastSale.map( sale =>
                <Link
                  key= {sale.id}
                  to={`/sales/${sale.id}/${sale.title.replace(/%/g,'percent').replace(/ /g,'-')}`}>
                  <h4>{sale.title}</h4>
                </Link>
              )}
            </div>
            <div className="new-sale-container column is-quarter">
              <Link to={{ pathname: '/profile/new-sale', state: { ...props} }}>
                <div className="new-sale-button">new sAle</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default MerchantShow
