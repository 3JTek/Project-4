import React from 'react'

import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = process.env.MAPBOX_KEY

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

  calculDistance(){
    const {customer1, customer2} = this.state.customers
    const [lng, lat] = this.state.latlngReversed
    const distanceX = Math.abs(customer2.lng - lng)
    const distanceY = Math.abs(customer2.lat - lat)

    console.log('diff latlng', distanceX, distanceY)
    const kmX = distanceX * (111.320*Math.cos(customer1.lat*Math.PI/180))
    const kmY = distanceY * 110.574
    const kmDistance = Math.sqrt(Math.pow(kmX,2) + Math.pow(kmY,2))
    console.log('kmX, kmY',kmX, kmY)
    console.log('kmDistance',kmDistance)

  }

  createGeoJSONCircle (center, radiusInKm, points) {
    console.log('Radius', radiusInKm)
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
      markerDOM.className = 'customer-marker'
      return new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
        .setLngLat([String(lng), String(lat)])
        .addTo(this.map)
    })
  }

  componentDidMount(){
    this.createMap()
      .then(() => this.createMarkups())
      .then(() => this.map.on('load', () => this.addSource()))
      .then(() => this.calculDistance())
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
