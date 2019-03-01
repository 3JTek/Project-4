import React from 'react'


const CustomerShow = ( { categories, handleChange, handleSubmit }) => {
  if (!categories) return <h1> Loading</h1>
  console.log(categories[0])
  return(
    <div>
      <div
        className="test"
        style={{ backgroundImage: `url(${categories[0].logo})` }}
      >
      </div>
      <div className="customer-profile-select">
        <section className="container">
          <form onSubmit={handleSubmit}>
            <label className="label">Change your categroy of interest</label>
            <div className="field has-addons">
              <span
                className="select is-fullwidth"
              >
                <select
                  name="category"
                  defaultValue="Please choose a new category"
                  onChange={handleChange}
                >
                  <option disabled>Please choose a new category</option>
                  {categories.map(category =>
                    <option
                      key={category.id}
                      value={`${category.id}-${category.type}`}
                    >
                      {category.type}
                    </option>
                  )}
                </select>
              </span>
              <button className="button is-info">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default CustomerShow
