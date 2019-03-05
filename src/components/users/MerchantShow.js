import React from 'react'
import {Link} from 'react-router-dom'

const MerchantShow = ({business_name, email, hero_image, location, logo, sales}) => {//eslint-disable-line

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

              <h1 className="title is-4">{business_name/*eslint-disable-line*/}</h1>
              <hr />
              <h5>{email}</h5>
              <hr />
              <h5>{location}</h5>
            </div>
            <div className="column is-quarter">
              <h1 className="title is-4">current sale</h1>
              {currentSale.map( sale =>
                <Link
                  key= {sale.id}
                  to={{ pathname: `/sales/${sale.title.replace(/%/g,'percent').replace(/ /g,'-')}`,
                    state: { id: sale.id, saleExpired: false  } }}>
                  <h4>{sale.title}</h4>
                </Link>
              )}
              <hr />
              <h1 className="title is-4">sAles history</h1>
              {pastSale.map( sale =>
                <Link
                  key= {sale.id}
                  to={{ pathname: `/sales/${sale.title.replace(/%/g,'percent').replace(/ /g,'-')}`,
                    state: { id: sale.id, saleExpired: true } }}>
                  <h4>{sale.title}</h4>
                </Link>
              )}
            </div>
            <div className="new-sale-container column is-quarter">
              <Link to="/profile/new-sale">
                <div className="new-sale-button">new sale</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default MerchantShow
