import React from 'react'

import MapboxAutocomplete from 'react-mapbox-autocomplete'
import Auth from '../../lib/Auth'
import Loading from '../common/Loading'
import Flash from '../../lib/Flash'

import { withRouter } from 'react-router-dom'

import axios from 'axios'

const Category = ({ id, type, logo, isSelected, onChange }) => (
  <>
    <div className="column">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={isSelected}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <img className="customer-checkbox" src={logo} alt={type} />
        <h1>{type}</h1>
      </label>
    </div>
  </>
)

class CustomerShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        location: '',
        email: '',
        categories: []
      },
      categories: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchCategories = this.fetchCategories.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  componentDidMount() {
    axios(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(({data}) => this.setState({ user: data}))
      .catch(({response}) => this.setState({...response}))

    axios.get('/api/categories')
      .then(this.fetchCategories)


  }

  fetchCategories(res) {
    this.setState({
      ...this.state,
      categories: res.data.reduce(
        (categories, category) => ({
          ...categories,
          [category.id]: {
            ...category,
            isSelected: this.state.user.categories.map(category => category.id).includes(category.id)
          }
        }),
        {}
      )
    })
  }

  selectAllcategories = isSelected => {
    Object.keys(this.state.categories).forEach(id => {
      this.setState(prevState => ({
        categories: {
          ...prevState.categories,
          [id]: {
            ...this.state.categories[id],
            isSelected
          }
        }
      }))
    })
  }

  selectAll = () => this.selectAllcategories(true)
  deselectAll = () => this.selectAllcategories(false)

  selectCategory = event => {
    const { name } = event.target
    console.log('name', name)
    this.setState(prevState => ({
      categories: {
        ...prevState.categories,
        [name]: {
          ...prevState.categories[name],
          isSelected: !prevState.categories[name].isSelected
        }
      }
    }))
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { user, categories } = this.state
    const dataToSend = {
      ...user,
      categories: Object.values(categories)
        .filter(category => category.isSelected)
        .map(category => category)

    }
    axios
      .put(`/api/users/${Auth.getPayload().sub}`, dataToSend,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then(() => {
        Flash.setMessage('info', 'Changes saved')
        this.props.history.push('/profile')

      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  createCheckbox = category => (
    <Category
      id={category.id}
      name={category.type}
      logo={category.logo}
      isSelected={category.isSelected}
      onChange={this.selectCategory}
      key={category.id}
    />
  )

  createCategories = () => {
    const { categories } = this.state
    if (!categories) return null
    return Object.values(categories).map(this.createCheckbox)
  }

  suggestionSelect(result, lat, lng ) {
    console.log(result, lat, lng)
    const user = {
      ...this.state.user,
      location: result,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
    const errors = {...this.state.errors, user: { location: '' }}
    this.setState({ user, errors })
  }


  render() {
    if (!this.state) return <Loading />
    return (
      <div className="container">
        <div>
          <div className="container">
            <form
              className="columns is-multiline customer-update"
              onSubmit={this.handleSubmit}>
              {this.createCategories()}
              <div>
                <button
                  type="button"
                  className="button"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
              </div>
              <div className="field">
                <label className="label">Update your email</label>
                <div className="control">
                  <input
                    className="input"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    placeholder="Email"
                    value={this.state.user.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Update your location</label>
                <div className="control is-expanded">
                  <MapboxAutocomplete
                    placeholder={this.state.user.location}
                    publicKey={process.env.MAPBOX_KEY}
                    inputClass='input form-control search'
                    onSuggestionSelect={this.suggestionSelect}
                    resetSearch={false}
                    name="location"
                  />
                </div>
              </div>
              <button type="submit" className="button">
                Save
              </button>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(CustomerShow)
