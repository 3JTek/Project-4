import React from 'react'
import Loading from '../common/Loading'

import mapboxgl from 'mapbox-gl'
import axios from 'axios'

class SaleShowMiniMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      saleRadius: 2,
      businessLat: this.props.businessLatLng.lat,
      businessLng: this.props.businessLatLng.lng
    }
    this.customersDistance = [],
    this.changeSaleRadius = this.changeSaleRadius.bind(this)
  }

  //Create sale impact area on the map
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

  addSource(){
    const {businessLat, businessLng, saleRadius} = this.state
    this.map.addSource('polygon', this.createGeoJSONCircle([businessLng, businessLat], saleRadius))

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
    this.state.customers.map( (customer, index) => {
      const {lat, lng} = customer
      const markerDOM = document.createElement('div')
      markerDOM.className = 'customer-marker'
      markerDOM.id = index
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
        center: [this.state.businessLng, this.state.businessLat],
        scrollZoom: true,
        zoom: 11
      })
      resolve()
    })
  }

  changeSaleRadius({ target: { name }}){
    const newSaleRadius = name === 'increase-radius' ?
      this.state.saleRadius + 0.2:
      this.state.saleRadius - 0.2
    this.setState({saleRadius: newSaleRadius})
  }

  calculDistanceFromBusiness(){
    this.customersDistance = this.state.customers.map(customer => {
      const {businessLat, businessLng} = this.state
      const {lat, lng} = customer
      const lngDiff = Math.abs(lng - businessLng)
      const latDiff = Math.abs(lat - businessLat)
      const kmX = lngDiff * (111.320*Math.cos(businessLat*Math.PI/180))
      const kmY = latDiff * 110.574
      return Math.sqrt(Math.pow(kmX,2) + Math.pow(kmY,2))

    })
  }

  updateMarkersReached(){
    console.log(this.customersDistance)
    this.customersDistance.map((distance, index) => {
      document.getElementById(index).classList.remove('customer-reached')
      if(distance <= this.state.saleRadius){
        document.getElementById(index).classList.add('customer-reached')
        console.log('reached', index)
      }
    })
  }

  componentDidMount(){
    this.createMap()
      .then(() => this.map.on('load', () => this.addSource()))
      .then(() => axios('/api/users?customers_only=true'))
      .then(({data}) => this.setState({customers: data }))
      .then(() => this.createMarkups())
      .then(() => this.calculDistanceFromBusiness())
      .then(() => this.updateMarkersReached())
  }

  componentDidUpdate(){
    if (this.map.isSourceLoaded('polygon')){
      this.map.removeLayer('polygon')
      this.map.removeSource('polygon')
      this.addSource()
      this.updateMarkersReached()
    }
  }

  render(){
    console.log('State', this.state)
    if(!this.state) return <Loading/>

    return(
      <div>
        <div id='map' ref={element => this.mapDOMElement = element}/>
        <button
          className="button is-primary"
          onClick={this.changeSaleRadius}
          name="increase-radius">Increase Sale Reach</button>
        <button
          className="button is-primary"
          onClick={this.changeSaleRadius}
          name="decrease-radius">Decrease Sale Reach</button>
      </div>
    )
  }
}

export default SaleShowMiniMap
