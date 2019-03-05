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
              <p className="email">{email}</p>
              <hr />
              <address className="address">{location}</address>
            </div>
            <div className="column is-half">
<<<<<<< HEAD
              <h1 className="title is-4 active-sales">Current Sales</h1>
=======
              <h1 className="title is-4">current sales</h1>
>>>>>>> dev
              {currentSale.map( sale =>
                <Link
                  key= {sale.id}
                  to={`/sales/${sale.id}/${sale.title.replace(/%/g,'percent').replace(/ /g,'-')}`}>
                  <p>{sale.title}</p>
                </Link>
              )}
              <hr />
<<<<<<< HEAD
              <h1 className="title is-4 past-sales">Sale History</h1>
=======
              <h1 className="title is-4">sale history</h1>
>>>>>>> dev
              {pastSale.map( sale =>
                <Link
                  key= {sale.id}
                  to={`/sales/${sale.id}/${sale.title.replace(/%/g,'percent').replace(/ /g,'-')}`}>
                  <p>{sale.title}</p>
                </Link>
              )}
              <Link to={{ pathname: '/profile/new-sale', state: { ...props} }}>
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
