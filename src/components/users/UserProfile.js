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
      selected: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  componentDidMount(){

    axios(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(({data}) => this.setState({...data}))
      .catch(({response}) => this.setState({...response}))

  }

  handleChange({target: { value }}) {
    const data = { ...this.state,
      categories: {
        id: parseInt(value.split('-')[0]),
        type: value.split('-')[1]
      }}
    this.setState(data)
  }

  handleFormChange({target: { name, value }}) {
    if (name === 'email' && value.includes(' ')) return
    const data = { ...this.state, [name]: value }
    this.setState({ data })
  }

  handleClick(e, i){
    this.setState({ selected: i })
  }

  handleSubmit(e) {
    const dataToSend = {...this.state}
    delete dataToSend.categories
    e.preventDefault()
    axios
      .put(`/api/users/${Auth.getPayload().sub}`, dataToSend,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then((res) => {
        Flash.setMessage('info', 'Changes saved')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  suggestionSelect(result, lat, lng ) {
    console.log(result, lat, lng)
    const data = {
      ...this.state.data,
      location: result,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
    const errors = {...this.state.errors, location: ''}
    this.setState({ data, errors })
  }

  render(){

    if(this.state === '') return <Loading/>
    //If the user doesn't exist (anymore) in the database, return 404
    if(this.state.status === 404) return <PageNotFound/>
<<<<<<< HEAD

=======
>>>>>>> dev
    return(
      <section>
        {this.state.is_merchant === true && <MerchantShow  {...this.state}/>}
        {this.state.is_merchant === false &&
          <CustomerShow />
        }
      </section>
    )
  }
}

export default UserProfile
