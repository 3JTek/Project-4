import React from 'react'

import mapboxgl from 'mapbox-gl'

class MiniMap extends React.Component {
  constructor(){
    super()
    this.state = {

    }
    this.customerLocation = []
  }

  createMap(){
    return new Promise(resolve => {
      mapboxgl.accessToken = process.env.MAPBOX_KEY
      this.map = new mapboxgl.Map({
        container: this.mapDOMElement,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [-0.118092, 51.509865],
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
        .setLngLat([longitude, latitude])
        .addTo(this.map)
    }
    const [lat, lng] = [-0.118092, 51.509865]
    const markerDOM = document.createElement('div')
    markerDOM.className = 'business-marker'
    new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
      .setLngLat([lat, lng])
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
    return(
      <div id='map' ref={element => this.mapDOMElement = element}/>
    )
  }
}

export default MiniMap
