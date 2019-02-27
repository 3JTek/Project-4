import React from 'react'

import axios from 'axios'

import Loading from '../common/Loading'

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
    const {category, content, expiry_date, title, user} = this.state
    console.log(this.state)
    return(
      <main>
        <section>
          <div
            className="business-hero"
            style={{backgroundImage: `url(${user.hero_image})`}}
            alt={user.business_name}>
            <div className="business-logo">
              <img className="logo" src={user.logo}/>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title is-4">{title}</h1>
            <hr />
            <p>{content}</p>
            <hr />
            <p>{expiry_date}</p>              
          </div>
        </section>
      </main>
    )
  }
}

export default SaleShow
