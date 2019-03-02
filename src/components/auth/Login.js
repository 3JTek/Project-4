import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: {name, value}}) {
    const data = { ...this.state.data, [name]: value }
    const errors = {...this.state.errors, message: null}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/login', this.state.data)
      .then((res) => {
        Auth.setToken(res.data.token)
        Flash.setMessage('success', res.data.message)
      })
      .then(() => {
        this.props.toggle('loginActive')
        this.props.history.push('/')
      })
      .catch(err => this.setState({ errors: err.response.data}))
    const data = { email: '', password: '' }
    this.setState({ data: data })
  }

  render() {
    const errors = this.state.errors
    return (
      <main
        className={ `section ${this.props.displayed}` }
        id="loginFormSection"
      >
        <div className="container">

          <form onSubmit={this.handleSubmit}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      placeholder="Email"
                      value={this.state.data.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.data.password}
                      onChange={this.handleChange}
                    />
                    {errors.message && <small className="help is-danger">{errors.message}</small>}
                  </div>
                </div>
                <div className="control">
                  <button className="button is-info">Log in</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    )
  }

}

export default withRouter(Login)
