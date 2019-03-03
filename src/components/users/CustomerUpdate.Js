import React from 'react'
import MapboxAutocomplete from 'react-mapbox-autocomplete'

const CustomerUpdateForm = ({
  data,
  suggestionSelect,
  handleFormChange
}) => {

  return(
    <div className="customer-update">
      <form>
        <div className="field">
          <label className="label">Update your email</label>
          <div className="control">
            <input
              className="input"
              name="email"
              type="email"
              onChange={handleFormChange}
              placeholder="Email"
              value={data.email}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Update your location</label>
          <div className="control is-expanded">
            <MapboxAutocomplete
              publicKey={process.env.MAPBOX_KEY}
              inputClass='input form-control search'
              onSuggestionSelect={suggestionSelect}
              resetSearch={false}
              name="location"
            />
          </div>
        </div>
      </form>
    </div>
  )

}

export default CustomerUpdateForm
