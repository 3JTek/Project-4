import React from 'react'
import Login from '../auth/Login'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      navbarOpen: false,
      loginActive: false
    }
    this.toggle = this.toggle.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggle(key){
    this.setState({[key]: !this.state[key]})
  }

  logout() {
    Auth.removeToken()
    Flash.setMessage('danger', 'You have logged out')
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname &&
      this.props.location.pathname !== '/login'){
      this.setState({ navbarOpen: false, loginActive: false })
    }
  }

  render(){
    return(
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <h1 className="title is-2"><span id="navbar-hero">Gather</span></h1>
              </Link>
            </div>
            <div className="navbar-end">
              {!Auth.isAuthenticated() &&
                  <Link
                    to="/login"
                    className="navbar-item"
                    onClick={() => this.toggle('loginActive')}>Login
                  </Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </nav>
        <Login
          displayed={`${this.state.loginActive ? 'displayed' : ''}`}
          toggle={this.toggle}
        />
      </div>
    )
  }
}

export default withRouter(Navbar)
