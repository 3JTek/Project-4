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
        center: [this.props.latlng[0], this.props.latlng[1]],
        scrollZoom: true,
        zoom: 12
      })
      resolve()
    })
  }

  addSource(){
    this.map.addSource('polygon', this.createGeoJSONCircle(
      this.props.latlng,
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

    var coords = {
      latitude: center[1],
      longitude: center[0]
    }

    var km = radiusInKm

    var ret = []
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180))
    var distanceY = km/110.574

    var theta, x, y
    for(var i=0; i<points; i++) {
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

  componentDidMount(){
    this.createMap()
      .then(() => this.map.on('load', () => this.addSource()))
  }

  componentDidUpdate(){
    this.map.removeLayer('polygon')
    this.map.removeSource('polygon')
    this.addSource()
  }

  render(){
    console.log(this.props)
    return(
      <div id='map' ref={element => this.mapDOMElement = element}/>
    )
  }
}

export default MiniMap
