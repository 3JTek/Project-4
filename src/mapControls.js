import React from 'react'

const MapControls = ({ changeSaleRadius }) => {
  return(
    <div className="">
      <button
        className="button is-primary"
        onClick={changeSaleRadius}
        name="increase-radius">Increase Sale Reach</button>
      <button
        className="button is-primary"
        onClick={changeSaleRadius}
        name="decrease-radius">Increase Sale Reach</button>
    </div>
  )
}

export default MapControls
