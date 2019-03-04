import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './style.scss'

import Home from './components/Home'
import Navbar from './components/common/Navbar'
import FlashMessages from './components/common/FlashMessages'
import RegisterMerchant from './components/auth/RegisterMerchant'
import RegisterCustomer from './components/auth/RegisterCustomer'
import UserProfile from './components/users/UserProfile'
import SalesShow from './components/sales/SalesShow'
import SalesNew from './components/sales/SalesNew'
import Test from './Test'

import MiniMap from './components/MiniMap'

class App extends React.Component{
  constructor(){
    super()
    this.state = ''
  }

  render(){
    return(
      <BrowserRouter>

        <main>

          <Navbar />
          <FlashMessages />
          <Switch>

            <Route path="/map" component={MiniMap} />

            <Route path="/test" component={Test} />
            <Route path="/profile/new-sale" component={SalesNew} />
            <Route path="/sales/:id/" component={SalesShow} />            
            <Route path="/sales/:id" component={SalesShow} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/signup" component={RegisterCustomer} />
            <Route path="/register" component={RegisterMerchant} />
            <Route path="/" component={Home} />
          </Switch>

        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
