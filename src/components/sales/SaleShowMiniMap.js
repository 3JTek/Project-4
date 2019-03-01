import React from 'react'
import Loading from '../common/Loading'

import mapboxgl from 'mapbox-gl'

class SaleShowMiniMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lat: this.props.businessLatLng.lat,
      lng: this.props.businessLatLng.lng
    }
    this.customerLocation = []
  }

  createMap(){
    return new Promise(resolve => {
      mapboxgl.accessToken = process.env.MAPBOX_KEY
      this.map = new mapboxgl.Map({
        container: this.mapDOMElement,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [this.state.lng, this.state.lat],
        scrollZoom: true,
        zoom: 10
      })
      resolve()
    })
  }

  createMarkups(){
    if(this.customerLocation) {
      const {latitude, longitude} = this.customerLocation
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
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }
    })
      .then(({coords}) => this.customerLocation = coords)
      .catch(err => console.warn(err))
  }

  componentDidMount(){
    this.getUserLocation()
      .then(() => this.createMap())
      .then(() => this.createMarkups())
  }

  render(){
    if(!this.state) return <Loading/>

    console.log(this.state)
    return(
      <div id='map' ref={element => this.mapDOMElement = element}/>
    )
  }
}

export default SaleShowMiniMap
