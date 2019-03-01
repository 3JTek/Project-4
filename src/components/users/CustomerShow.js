import React from 'react'
import CustomerUpdateForm from './CustomerUpdate'

const CustomerShow = ( {
  data,
  categories,
  suggestionSelect,
  handleFormChange,
  handleClick
}) => {
  console.log(data)
  if (!categories) return <h1> Loading</h1>
  return(
    <div className="section customer-profile">
      <h1>Your categories</h1>
      <div className="selected-categories">
      </div>
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {categories.map((category, i) =>
              <button
                key={category.id}
                className="customer-button"
                style={{ backgroundImage: `url(${category.logo})` }}
                onClick={(e) => handleClick(e, i)}
              >
              </button>
            )}
          </div>
        </div>
      </section>
      <div className="customer-description">
        <div
          className="description-image"
          style={{ background: 'yellow' }}
        ></div>
      </div>
      <CustomerUpdateForm
        data={data}
        suggestionSelect={suggestionSelect}
        handleFormChange={handleFormChange}
      />
    </div>
  )
}

export default CustomerShow
