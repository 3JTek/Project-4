import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import SalesShow from './components/SalesShow'

class App extends React.Component{
  constructor(){
    super()
    this.state = ''
  }

  render(){
    return(
      <BrowserRouter>

        <Switch>
          <Route path="/sales/:id" component={SalesShow} />
        </Switch>

      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
