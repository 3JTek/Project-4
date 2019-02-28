import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

class Navbar extends React.Component {
  constructor(){
    super()

  }

  logout() {
    Auth.removeToken()
    Flash.setMessage('danger', 'You have logged out')
    this.props.history.push('/')
  }


  render(){
    return(
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <h1 className="title is-2"><span id="navbar-hero">Gather</span></h1>
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)
