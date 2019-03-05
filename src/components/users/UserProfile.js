import React from 'react'

import axios from 'axios'

import Loading from '../common/Loading'
import PageNotFound from '../common/PageNotFound'
import Flash from '../../lib/Flash'
import Auth from '../../lib/Auth'
import MerchantShow from './MerchantShow'
import CustomerShow from './CustomerShow'

class UserProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    
    }
  }

  componentDidMount(){

    axios(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(({data}) => this.setState({...data}))
      .catch(({response}) => this.setState({...response}))

  }


  render(){

    if(this.state === '') return <Loading/>
    //If the user doesn't exist (anymore) in the database, return 404
    if(this.state.status === 404) return <PageNotFound/>

    return(
      <section>
        {this.state.is_merchant === true && <MerchantShow  {...this.state}/>}
        {this.state.is_merchant === false &&
          <CustomerShow {...this.props}/>
        }
      </section>
    )
  }
}

export default UserProfile
