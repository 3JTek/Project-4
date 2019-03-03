import React from 'react'
import Loading from '../common/Loading'

import mapboxgl from 'mapbox-gl'
import axios from 'axios'

class SaleShowMiniMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      saleRadius: 0.5,
      lat: this.props.businessLatLng.lat,
      lng: this.props.businessLatLng.lng
    }
  }

  //Create sale impact area on the map
  createGeoJSONCircle (center, radiusInKm, points) {
    console.log('Radius', radiusInKm)
    console.log('center', center)

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

  addSource(){
    const {lat, lng, saleRadius} = this.state
    this.map.addSource('polygon', this.createGeoJSONCircle([lng, lat], saleRadius))

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

  createMarkups(){
    this.state.customers.map( customer => {
      const {lat, lng} = customer
      const markerDOM = document.createElement('div')
      markerDOM.className = 'customer-marker'
      new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
        .setLngLat([String(lng), String(lat)])
        .addTo(this.map)
    })
  }

  createMap(){
    return new Promise(resolve => {
      mapboxgl.accessToken = process.env.MAPBOX_KEY
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

  componentDidMount(){
    axios('/api/users?customers_only=true')
      .then(({data}) => this.setState({customers: data }))
      .then(() => this.createMap())
      .then(() => this.createMarkups())
      .then(() => this.map.on('load', () => this.addSource()))

  }

  render(){
    console.log('State', this.state)
    if(!this.state) return <Loading/>

    return(
      <div id='map' ref={element => this.mapDOMElement = element}/>
    )
  }
}

export default SaleShowMiniMap
