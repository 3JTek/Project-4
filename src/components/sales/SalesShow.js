import React from 'react'

import axios from 'axios'

import Loading from '../common/Loading'
import PageNotFound from '../common/PageNotFound'
import SaleShowMiniMap from './SaleShowMiniMap'

class SaleShow extends React.Component{
  constructor(props){
    super(props)
  }

  calulateTimeRemaining(){
    const totalHours = (new Date(this.state.expiry_date)- Date.now()) / 1000 / 3600
    return {
      daysRemaining: Math.floor(totalHours / 24) || null,
      hoursRemaining: Math.round(totalHours % 24) || null
    }
  }

  componentDidMount(){
    axios(`/api/sales/${this.props.location.state.id}`)
      .then(({data}) => this.setState({...data}))
      .catch(({response}) => this.setState({...response}))
  }

  render(){

    if(!this.state) return <Loading />
    if(this.state.status === 404) return <PageNotFound/>
    const {content, expiry_date, title, user} = this.state // eslint-disable-line
    const { daysRemaining, hoursRemaining } = this.calulateTimeRemaining()
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
              <div className="column is-half">
                <h1 className="title is-4">{title}</h1>
                <hr />
                <p>{content}</p>
                <hr />
                <p>
                  {daysRemaining &&
                    <span><strong>{daysRemaining}</strong> day(s) and </span>
                  }
                  {hoursRemaining &&
                    <span><strong>{hoursRemaining}</strong> hour(s) </span>
                  }
                  before sale ends</p>
              </div>
              <div className="column is-half">
                <h1 className="title is-4">Address</h1>
                <hr />
                <address>{user.location}</address>
                <hr />
                <SaleShowMiniMap businessLatLng={this.state.user}/>
                <hr />
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default SaleShow
