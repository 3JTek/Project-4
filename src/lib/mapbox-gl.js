const mapboxgl = process.env.NODE_ENV !== 'test' ? require('mapbox-gl') : {
  Map: () => null,
  Marker: () => ({
    setLngLat: () => ({
      addTo: () => null
    })
  }),
  Bounds: () => null
}

mapboxgl.accessToken = process.env.MAPBOX_KEY

export default mapboxgl
