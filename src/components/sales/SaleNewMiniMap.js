import React from 'react'

import mapboxgl from 'mapbox-gl'

class SaleShowMiniMap extends React.Component {
  constructor(props){
    super(props)
    this.categories = this.props.categories
    this.newSale = this.props.newSale
    this.user = this.props.user
    this.customers = this.props.customers
    this.customersDistance = this.props.customersDistance
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
    const {lat, lng} = this.newSale.user
    this.map.addSource('polygon', this.createGeoJSONCircle([lng, lat], this.props.saleRadius))

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
    this.customers.map( (customer, index) => {
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
        center: [this.newSale.user.lng, this.newSale.user.lat],
        scrollZoom: true,
        zoom: 11
      })
      resolve()
    })
  }

  updateMarkersReached(){

    this.props.customersDistance.map((distance, index) => {

      document.getElementById(index).classList.remove('customer-reached')
      document.getElementById(index).classList.remove('customer-hide')


      if(distance <= this.props.saleRadius){
        document.getElementById(index).classList.add('customer-reached')
      }

      //Return an array of category ids for each customer
      const customerCategoryIds = this.props.customers[index]
        .categories.map(category => category.id)

      //Compare the above array to the sale category
      if(!customerCategoryIds.includes(this.props.newSale.category.id)){
        document.getElementById(index).classList.add('customer-hide')
      }
    })
  }

  componentDidMount(){
    this.createMap()
      .then(() => this.map.on('load', () => this.addSource()))
      .then(() => this.createMarkups())
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
    console.log('StateOfMiniMap', this.props)

    return(
      <div id='map' ref={element => this.mapDOMElement = element}/>
    )
  }
}

export default SaleShowMiniMap
