import React from 'react'
import ReactDOM from 'react-dom'

import 'bulma'
import './style.scss'

import MiniMap from './components/miniMap'
import MapControls from './components/MapControls'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      latlngReversed: [51.509865, -0.118092].reverse(),
      customers: {
        customer1: {
          lat: 51.509864,
          lng: -0.121092
        },
        customer2: {
          lat: 51.52,
          lng: -0.128092
        }
      },
      saleRadius: 0.5
    }
    this.changeSaleRadius = this.changeSaleRadius.bind(this)
  }

  changeSaleRadius({ target: { name }}){
    const newSaleRadius = name === 'increase-radius' ?
      this.state.saleRadius + 0.2:
      this.state.saleRadius - 0.2
    this.setState({saleRadius: newSaleRadius})
  }

  render(){
    return(
      <main>
        <MiniMap {...this.state} />
        <MapControls
          handleChange={this.handleChange}
          changeSaleRadius={this.changeSaleRadius}
          handleSubmit={this.handleSubmit}
        />
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
