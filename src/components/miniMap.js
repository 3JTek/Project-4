import React from 'react'

import mapboxgl from 'mapbox-gl'

class MiniMap extends React.Component {
  constructor(props){
    super(props)
    this.state = ''
  }

  createMap(){
    return new Promise(resolve => {
      mapboxgl.accessToken = process.env.MAPBOX_KEY
      this.map = new mapboxgl.Map({
        container: this.mapDOMElement,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [this.props.latlngReversed[0], this.props.latlngReversed[1]],
        scrollZoom: true,
        zoom: 12
      })
      resolve()
    })
  }

  addSource(){
    this.map.addSource('polygon', this.createGeoJSONCircle(
      this.props.latlngReversed,
      this.props.saleRadius
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
    Object.keys(this.props.customers).map(customer => {
      const {lat, lng} = this.props.customers[customer]
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
      <div id='map' ref={element => this.mapDOMElement = element}/>
    )
  }
}

export default MiniMap
