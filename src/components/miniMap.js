import React from 'react'

import mapboxgl from 'mapbox-gl'

import MapControls from './MapControls'

class MiniMap extends React.Component {
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

  createMap(){
    return new Promise(resolve => {
      mapboxgl.accessToken = process.env.MAPBOX_KEY
      this.map = new mapboxgl.Map({
        container: this.mapDOMElement,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [this.state.latlngReversed[0], this.state.latlngReversed[1]],
        scrollZoom: true,
        zoom: 12
      })
      resolve()
    })
  }

  addSource(){
    this.map.addSource('polygon', this.createGeoJSONCircle(
      this.state.latlngReversed,
      this.state.saleRadius
    ))

    this.map.addLayer({
      'id': 'polygon',
      'type': 'fill',
      'source': 'polygon',
      'layout': {},
      'paint': {
        'fill-color': 'blue',
        'fill-opacity': 0.3
      }
    })
  }

  createGeoJSONCircle (center, radiusInKm, points) {
    if(!points) points = 64

    const coords = {
      latitude: center[1],
      longitude: center[0]
    }

    const km = radiusInKm

    const ret = []
    const distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180))
    const distanceY = km/110.574

    let theta, x, y
    for(let i=0; i<points; i++) {
      theta = (i/points)*(2*Math.PI)
      x = distanceX*Math.cos(theta)
      y = distanceY*Math.sin(theta)

      ret.push([coords.longitude+x, coords.latitude+y])
    }
    ret.push(ret[0])

    return {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [ret]
          }
        }]
      }
    }
  }

  createMarkups(){
    Object.keys(this.state.customers).map(customer => {
      const {lat, lng} = this.state.customers[customer]
      const markerDOM = document.createElement('div')
      markerDOM.className = 'custom-marker'
      return new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
        .setLngLat([String(lng), String(lat)])
        .addTo(this.map)
    })
  }

  componentDidMount(){
    this.createMap()
      .then(() => this.createMarkups())
      .then(() => this.map.on('load', () => this.addSource()))
  }

  componentDidUpdate(){
    this.map.removeLayer('polygon')
    this.map.removeSource('polygon')
    this.addSource()
  }

  render(){
    return(
      <main>
        <div id='map' ref={element => this.mapDOMElement = element}/>
        <MapControls
          handleChange={this.handleChange}
          changeSaleRadius={this.changeSaleRadius}
          handleSubmit={this.handleSubmit}
        />
      </main>
    )
  }
}

export default MiniMap
