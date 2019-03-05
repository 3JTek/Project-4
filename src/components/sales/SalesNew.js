import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'

import Loading from '../common/Loading'
import Flash from '../../lib/Flash'
import Auth from '../../lib/Auth'
import SaleNewMiniMap from './SaleNewMiniMap'

class SaleNew extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      newSale: {
        title: '',
        content: '',
        category: '',
        sale_fees: 94,
        expiry_date: moment().format('YYYY-MM-DD hh:mm:ss')
      },
      saleRadius: 2
    }
    this.customersDistance = []

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.changeSaleRadius = this.changeSaleRadius.bind(this)
  }

  handleChange({target: { name, value }}) {
    // const data = { ...this.state.newSale, [name]: value }
    this.setState({newSale: {...this.state.newSale, [name]: value }})
  }

  handleDateChange(date) {
    this.setState({newSale: {...this.state.newSale,
      expiry_date: moment(date).format('YYYY-MM-DD HH:mm:ss')
    }})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/sales', this.state.newSale)
      .then(()=> {
        Flash.setMessage('success', 'Sale Successfuly Created')
        this.props.history.push('/profile')
      })
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleSelect({target: { value }}) {
    this.setState({newSale: {...this.state.newSale,
      category: {
        id: parseInt(value.split('-')[0]),
        type: value.split('-')[1]
      }
    }})
  }

  calculSalePrice(){
    return this.customersDistance.reduce((price, customerDistance) => {
      return customerDistance <= this.state.saleRadius? price += 46 : price
    },0)
  }

  calculDistanceFromBusiness(){
    this.customersDistance = this.state.customers.map(customer => {
      const businessLat = this.state.newSale.user.lat
      const businessLng = this.state.newSale.user.lng
      const {lat, lng} = customer
      const lngDiff = Math.abs(lng - businessLng)
      const latDiff = Math.abs(lat - businessLat)
      const kmX = lngDiff * (111.320*Math.cos(businessLat*Math.PI/180))
      const kmY = latDiff * 110.574
      return Math.sqrt(Math.pow(kmX,2) + Math.pow(kmY,2))
    })
  }

  changeSaleRadius({ target: { name }}){
    const newSaleRadius = name === 'increase-radius' ?
      this.state.saleRadius + 0.2:
      this.state.saleRadius - 0.2
    this.setState({saleRadius: newSaleRadius})
  }

  componentDidMount(){
    axios(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(({data}) => this.setState({newSale: {...this.state.newSale, user: data}}))
      .catch(({response}) => this.setState({...response}))

    axios('/api/categories')
      .then(({data}) => this.setState({ categories: data }))

    axios('/api/users?customers_only=true')
      .then(({data}) => this.setState({customers: data }))

  }

  render(){
    if(!this.state.categories || !this.state.customers) return <Loading/>
    const { title, content, sale_fees, expiry_date} = this.state.newSale // eslint-disable-line
    this.calculDistanceFromBusiness()
    console.log('State before render', this.state)
    return(
      <section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <h4 className="label">Sale Title</h4>
                  <div className="control">
                    <input
                      className="input"
                      name="title"
                      placeholder="i.e. Crazy 70% off on next 50 coffees sold."
                      value= {title}
                      onChange={this.handleChange}
                    />
                  </div>
                  <hr />
                  <div className="field">
                    <h4 className="label">Category</h4>
                    <span
                      className="select is-fullwidth"
                    >
                      <select
                        name="category"
                        defaultValue="Please choose a category"
                        onChange={this.handleSelect}
                      >
                        <option disabled>Please choose a category</option>
                        {this.state.categories.map(category =>
                          <option
                            key={category.id}
                            value={`${category.id}-${category.type}`}
                          >
                            {category.type}
                          </option>
                        )}
                      </select>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="field">
                  <h4 className="label">Sale Description</h4>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="content"
                      value= {content}
                      onChange={this.handleChange}
                      placeholder="i.e. Come and enjoy the cheapest coffee you ever had and meet some great people that work or live around you. Don't forget to tell your friends and people around you."
                      rows="10">
                    </textarea>
                  </div>
                  <hr />
                </div>
                <p>The fees for this sale is <strong>£ {this.calculSalePrice()}</strong></p>
              </div>
              <div className="column is-half">
                <div className="field">
                  <h4 className="label">Expiry Date</h4>
                  <div className="control">
                    <DatePicker
                      className="input date-picker"
                      selected={expiry_date} //eslint-disable-line
                      onChange={this.handleDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="time"
                    />
                  </div>
                </div>
                <hr />
                <div className="field">
                  <h4 className="label">Sale Description</h4>
                  <SaleNewMiniMap
                    {...this.state}
                    customersDistance={this.customersDistance}
                  />
                </div>
                <button
                  className="button is-primary"
                  onClick={this.changeSaleRadius}
                  name="increase-radius">Increase Sale Reach</button>
                <button
                  className="button is-primary"
                  onClick={this.changeSaleRadius}
                  name="decrease-radius">Decrease Sale Reach</button>
                <hr />
              </div>
            </div>
            <button
              className="button is-primary"
              onClick={this.handleSubmit}
            >Create Sale</button>
          </div>
        </section>
      </section>
    )
  }
}

export default SaleNew
