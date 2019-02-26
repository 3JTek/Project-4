import React from 'react'
import ReactDOM from 'react-dom'

import 'bulma'
import './style.scss'

import MiniMap from './miniMap'
import MapControls from './MapControls'

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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeSaleRadius({ target: { name, value }}){
    const newSaleRadius = name === 'increase-radius' ?
      this.state.saleRadius + 0.2:
      this.state.saleRadius - 0.2
    this.setState({saleRadius: newSaleRadius})
  }

  handleChange({ target: { name, value }}){
    console.log(this.state.data.lat, this.state.data.lng)
    const data = {...this.state, [name]: value}
    this.setState({data})
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({latlng: [this.state.data.lat, this.state.data.lng]})
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
