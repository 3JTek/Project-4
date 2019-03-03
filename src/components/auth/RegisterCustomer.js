import React from 'react'
import axios from 'axios'
import MapboxAutocomplete from 'react-mapbox-autocomplete'

import Flash from '../../lib/Flash'
import Loading from '../common/Loading'

class RegisterCustomer extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: '',
        password_confirmation: '',
        location: '',
        lat: '',
        lng: '',
        phone_number: '',
        category: {
          id: '',
          type: ''
        },
        is_merchant: 'False'
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  componentDidMount(){
    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
  }

  handleChange({target: { name, value }}) {
    if (name === 'email' && value.includes(' ')) return
    const data = { ...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null}
    this.setState({ data, errors })
  }

  handleSelect({target: { value }}) {
    const data = { ...this.state.data,
      category: {
        id: parseInt(value.split('-')[0]),
        type: value.split('-')[1]
      }}
    const errors = {...this.state.errors, category: null}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/register', this.state.data)
      .then(()=> {
        Flash.setMessage('success', 'Successfully registered')
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data}))
  }

  suggestionSelect(result, lat, lng ) {
    const data = {
      ...this.state.data,
      location: result,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
    const errors = {...this.state.errors, location: ''}
    this.setState({ data, errors })
  }

  render() {
    const {
      email,
      password,
      password_confirmation,
      location,
      phone_number,
      category
    } = this.state.data
    const errors = this.state.errors
    if (!this.state.categories) return <Loading />
    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Register as a Customer</h2>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                />
                {errors.email && <small className="help is-danger">{errors.email}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              {errors.password && <small className="help is-danger">{errors.password}</small>}
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <input
                className="input"
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={password_confirmation}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Please select a location</label>
              <div className="control is-expanded">
                <div className="input">
                  <MapboxAutocomplete
                    publicKey={process.env.MAPBOX_KEY}
                    inputClass='form-control search'
                    onSuggestionSelect={this.suggestionSelect}
                    resetSearch={false}
                    name="location"
                  />
                </div>
              </div>
            </div>
            {errors.location && <small className="help is-danger">Please enter an address</small>}
            <div className="field">
              <label className="label">Phone number</label>
              <input
                className="input"
                name="phone_number"
                placeholder="Enter your number so we can send you the latest sales"
                value={phone_number}
                onChange={this.handleChange}
              />
              {errors.phone_number && <small className="help is-danger">Please enter a number</small>}
            </div>
            <div className="field">
              <label className="label">Category</label>
              <span
                className="select is-fullwidth"
              >
                <select
                  name="category"
                  defaultValue="Please choose a category"
                  onChange={this.handleSelect}
                >
                  <option disabled>Please choose a category</option>
                  {this.state.categories.map(category =>
                    <option
                      key={category.id}
                      value={`${category.id}-${category.type}`}
                    >
                      {category.type}
                    </option>
                  )}
                </select>
              </span>
              {errors.category && <small className="help is-danger">Please select a category</small>}
            </div>
            <div className="regButton">
              <button className="button is-info">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterCustomer
