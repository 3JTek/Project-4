import React from 'react'
import Loading from '../common/Loading'

import mapboxgl from '../../lib/mapbox-gl'

class SaleShowMiniMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lat: this.props.businessLatLng.lat,
      lng: this.props.businessLatLng.lng
    }
  }

  createMap(){
    return new Promise(resolve => {
      this.map = new mapboxgl.Map({
        container: this.mapDOMElement,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [this.state.lng, this.state.lat],
        scrollZoom: true,
        zoom: 11
      })
      resolve()
    })
  }

  createMarkups(){
    if(this.state.customerLocationProvided) {
      const {latitude, longitude} = this.state.customerLocation
      const markerDOM = document.createElement('div')
      markerDOM.className = 'customer-marker'
      new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
        .setLngLat([String(longitude), String(latitude)])
        .addTo(this.map)
    }
    const {lat, lng} = this.state
    const markerDOM = document.createElement('div')
    markerDOM.className = 'business-marker'
    new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
      .setLngLat([String(lng), String(lat)])
      .addTo(this.map)
  }

  getUserLocation(){
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
      .then(({coords}) => {
        this.setState({customerLocation: coords, customerLocationProvided: true})
      })
      .catch(err => {
        this.setState({customerLocation: {
          latitude: this.state.lat,
          longitude: this.state.longitude
        }})
        console.warn(err)
      })
  }

  componentDidMount(){
    this.getUserLocation()
      .then(() => this.createMap())
      .then(() => this.createMarkups())
  }

  render(){
    console.log('StateOfShowMiniMap', this.state)
    if(!this.state.customerLocation) return <Loading/>
    const {latitude, longitude} = this.state.customerLocation

    console.log('StateOfShowMiniMap', this.state)
    return(
      <div>
        <a href= {`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${this.state.lat},${this.state.lng}&travelmode=walking`} rel="noopener noreferrer" target="_blank">
          <address>{this.props.address}</address>
        </a>
        <hr />
        <div id='map' ref={element => this.mapDOMElement = element}/>
      </div>
    )
  }
}

export default SaleShowMiniMap
