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

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){

    axios(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(({data}) => this.setState({...data}))
      .catch(({response}) => this.setState({...response}))

    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))

  }

  handleChange({target: { value }}) {
    const data = { ...this.state,
      category: {
        id: parseInt(value.split('-')[0]),
        type: value.split('-')[1]
      }}
    this.setState(data)
  }

  handleSubmit(e) {
    console.log(this.state)
    e.preventDefault()
    axios
      .put(`/api/users/${Auth.getPayload().sub}`, this.state,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then(() => {
        Flash.setMessage('info', 'Changes saved')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render(){

    if(this.state === '') return <Loading/>
    //If the user doesn't exist (anymore) in the database, return 404
    if(this.state.status === 404) return <PageNotFound/>
    return(
      <section>
        {this.state.is_merchant === true && <MerchantShow  {...this.state}/>}
        {this.state.is_merchant === false &&
          <CustomerShow {...this.state}
            data={this.state}
            categories={this.state.categories}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        }
      </section>
    )
  }
}

export default UserProfile
