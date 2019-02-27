import React from 'react'

import axios from 'axios'

import Loading from '../common/Loading'
import SaleMiniMap from './SaleMiniMap'

class SaleShow extends React.Component{
  constructor(props){
    super(props)
    this.state = ''
  }

  componentDidMount(){
    axios(`/api/sales/${this.props.match.params.id}`)
      .then(({data}) => this.setState({...data}))
  }

  render(){
    if(this.state === '') return <Loading/>
    const {content, expiry_date, title, user} = this.state // eslint-disable-line
    const hoursBeforeSaleEnd = Math.floor(
      (new Date(expiry_date)- Date.now()) / 1000 / 3600
    )
    console.log(this.state)
    return(
      <section>
        <section>
          <div
            className="business-hero"
            style={{backgroundImage: `url(${user.hero_image})`}}
            alt={user.business_name}>
            <div className="business-logo" style={{backgroundImage: `url(${user.logo})`}}>
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
                <p><strong>{hoursBeforeSaleEnd}</strong> hours before sale ends</p>
              </div>
              <div className="column is-half">
                <h1 className="title is-4">Address</h1>
                <hr />
                <address>{user.location}</address>
                <hr />
                <SaleMiniMap businessAddress={this.state.user.location}/>
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default SaleShow
