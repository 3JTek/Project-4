import React from 'react'
import axios from 'axios'

import Flash from '../../lib/Flash'

class RegisterCustomer extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: '',
        password_confirmation: '',
        location: '',
        phone_number: '',
        category: '',
        is_merchant: 'False'
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  render() {
    console.log(this.state.data)
    const {
      email,
      password,
      password_confirmation,
      location,
      phone_number,
      category,
    } = this.state.data
    const errors = this.state.errors

    return (
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
            <label className="label">Location</label>
            <input
              className="input"
              type="text"
              name="location"
              placeholder="Please enter your location"
              value={location}
              onChange={this.handleChange}
            />
            {errors.location && <small className="help is-danger">Please write a small bio about yourself</small>}
          </div>
          <div className="field">
            <label className="label">Phone number</label>
            <input
              className="input"
              name="phone_number"
              placeholder="Enter your number so we can send you the latest sales"
              value={phone_number}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Category</label>
            <input
              className="input"
              name="category"
              placeholder="Select your category"
              value={category}
              onChange={this.handleChange}
            />
          </div>
          <div className="regButton">
            <button className="button is-info">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterCustomer
