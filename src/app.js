import React from 'react'
import ReactDOM from 'react-dom'

import 'bulma'
import './style.scss'

class App extends React.Component{
  constructor(){
    super()
    this.state = ''
  }

  render(){
    return(
      <main>
        <h1>Welcome</h1>
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
