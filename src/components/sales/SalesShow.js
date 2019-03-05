import React from 'react'
import axios from 'axios'

import Loading from '../common/Loading'
import PageNotFound from '../common/PageNotFound'
import SaleShowMiniMap from './SaleShowMiniMap'

class SalesShow extends React.Component{
  calulateTimeRemaining(){
    const totalHours = (new Date(this.state.expiry_date)- Date.now()) / 1000 / 3600
    return {
      daysRemaining: Math.floor(totalHours / 24) || null,
      hoursRemaining: Math.round(totalHours % 24) || (Math.floor(totalHours / 24) === 0 ? 'less than 1 hour' : null)
    }
  }

  componentDidMount(){
    axios.get(`/api/sales/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .catch(err => this.setState(err.response))
  }

  render(){

    if(!this.state) return <Loading />
    if(this.state.status === 404) return <PageNotFound/>
    const {content, expiry_date, title, user} = this.state // eslint-disable-line
    const { daysRemaining, hoursRemaining } = this.calulateTimeRemaining()
    const saleExpired = new Date(this.state.expiry_date) - Date.now() > 0 ? false : true
    console.log(this.state)
    console.log(daysRemaining, hoursRemaining)
    return(
      <section>
        <section>
          <div
            className="business-hero"
            style={{backgroundImage: `url(${user.hero_image})`}}
            alt={user.business_name}>
            <div className="business-logo" style={{backgroundImage: `url(${user.logo})`}} alt='Business Logo'>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half  sale-title">
                <h2 className="title is-4">{title}</h2>
                <hr />
                <p>{content}</p>
                <hr />
                {!saleExpired &&
                  <p>
                    {daysRemaining &&
                      <span><strong>{daysRemaining}</strong> day(s) and </span>
                    }
                    {hoursRemaining &&
                      <span><strong>{hoursRemaining}</strong> hour(s) </span>
                    }
                    before sale ends</p>
                }
              </div>
              <div className="column is-half">
                <h1 className="title is-4 address">Address:</h1>
                <hr />
                <SaleShowMiniMap
                  address ={user.location}
                  businessLatLng={this.state.user}
                />
                <hr />
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default SalesShow
