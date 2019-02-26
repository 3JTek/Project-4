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
      data: {
        lat: '',
        lng: ''
      },
      latlng: [-0.118092, 51.509865],
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
