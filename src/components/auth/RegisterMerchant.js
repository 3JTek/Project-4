import React from 'react'
import axios from 'axios'
import MapboxAutocomplete from 'react-mapbox-autocomplete'
import Loading from '../common/Loading'
import Flash from '../../lib/Flash'

class RegisterMerchant extends React.Component {
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
        business_name: '',
        logo: '',
        hero_image: '',
        is_merchant: true
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  handleChange({target: { name, value }}) {
    if (name === 'email' && value.includes(' ')) return
    const data = { ...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null}
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
      password_confirmation: passwordConfirmation,
      business_name: businessName,
      logo,
      hero_image: heroImage
    } = this.state.data
    const errors = this.state.errors
    if (!this.state) return <Loading />
    return (
      <section className="container">
        <form onSubmit={this.handleSubmit}>
          <h2 className="title">Register as a merchant</h2>
          <div className="field">
            <label className="label">Business Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="business_name"
                placeholder="Business name"
                value={businessName}
                onChange={this.handleChange}
              />
              {errors.business && <small className="help is-danger">{errors.email}</small>}
            </div>
          </div>
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
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Please select a location</label>
            <div className="control is-expanded">
              <MapboxAutocomplete
                publicKey={process.env.MAPBOX_KEY}
                inputClass='input form-control search'
                onSuggestionSelect={this.suggestionSelect}
                resetSearch={false}
                name="location"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Logo</label>
            <input
              className="input"
              name="logo"
              placeholder="Add a logo"
              value={logo}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Company image</label>
            <input
              className="input"
              type="text"
              name="hero_image"
              placeholder="Enter an image to display on your profile"
              value={heroImage}
              onChange={this.handleChange}
            />
          </div>
          <div className="regButton">
            <button className="button is-info">Submit</button>

          </div>

        </form>
      </section>
    )
  }
}

export default RegisterMerchant
