import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
<<<<<<< HEAD
=======

>>>>>>> dev

import './style.scss'

<<<<<<< HEAD
import SalesShow from './components/SalesShow'
=======
import Home from './components/Home'
import FlashMessages from './components/common/FlashMessages'
import RegisterMerchant from './components/auth/RegisterMerchant'
import RegisterCustomer from './components/auth/RegisterCustomer'
>>>>>>> dev

class App extends React.Component{
  constructor(){
    super()
    this.state = ''
  }

  render(){
    return(
      <BrowserRouter>

<<<<<<< HEAD
        <Switch>
          <Route path="/sales/:id" component={SalesShow} />
        </Switch>

=======
        <main>
          <FlashMessages />
          <Switch>
            <Route path="/signup" component={RegisterCustomer} />
            <Route path="/register" component={RegisterMerchant} />
            <Route path="/" component={Home} />
          </Switch>

        </main>
>>>>>>> dev
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
