import React from 'react'
import DatePicker from 'react-datepicker'
import Promise from 'bluebird'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'

import Loading from '../common/Loading'
import Flash from '../../lib/Flash'
import SaleNewMiniMap from './SaleNewMiniMap'

class SaleNew extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      newSale: {
        title: '',
        content: '',
        category: '',
        expiry_date: moment().format('YYYY-MM-DD hh:mm:ss'),
        user: this.props.location.state
      },
      saleRadius: 2
    }
    this.sale_fees = '',
    this.customersDistance = []

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.changeSaleRadius = this.changeSaleRadius.bind(this)
  }

  handleChange({target: { name, value }}) {
    this.setState({newSale: {...this.state.newSale, [name]: value }})
  }

  changeSaleRadius({ target: { name }}){
    const newSaleRadius = name === 'increase-radius' ?
      this.state.saleRadius + 0.2:
      this.state.saleRadius - 0.2
    this.setState({saleRadius: newSaleRadius})
  }

  handleDateChange(date) {
    this.setState({newSale: {...this.state.newSale,
      expiry_date: moment(date).format('YYYY-MM-DD HH:mm:ss')
    }})
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
    return this.customersToContact().length * 46
  }

  calculDistanceFromBusiness(customers){
    this.customersDistance = customers.map(customer => {
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

  customersToContact(){
    return this.customersDistance.reduce((newArray, distance, index) => {
      if(distance <= this.state.saleRadius){
        //Return an array of category ids for each customer
        const customerCategoryIds = this.state.customers[index]
          .categories.map(category => category.id)
        //Compare the above array to the sale category
        if(customerCategoryIds.includes(this.state.newSale.category.id)){
          return newArray.concat(this.state.customers[index])
        }
      }
      return newArray
    },[])
  }

  handleSubmit(e) {
    e.preventDefault()

    const customerToReach = this.customersToContact()
    axios
      .post('/api/sales', {...this.state.newSale, customerToReach })
      .then(()=> {
        Flash.setMessage('success', 'Sale Successfuly Created')
        this.props.history.push('/profile')
      })
      .catch(err => this.setState({ errors: err.response.data}))
  }

  componentDidMount(){
    Promise.props({
      categories: axios('/api/categories').then(res => res.data),
      customers: axios('/api/users?customers_only=true').then(res => res.data)
    })
      .then(data => {
        this.calculDistanceFromBusiness(data.customers)
        this.setState({...data})
      })
  }

  render(){
    if(!this.state.categories || !this.state.customers) return <Loading/>
    const { title, content, expiry_date} = this.state.newSale // eslint-disable-line
    const saleFee = this.calculSalePrice()

    console.log('State before render', this.state)
    return(
      <section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Sale Title</label>
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
                    <label className="label">Category</label>
                    <span className="select is-fullwidth">
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
                  <label className="label">Sale Description</label>
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
                <p>The fees for this sale is <strong>£ {saleFee}</strong></p>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label">Expiry Date</label>
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
                  <label className="label">Sale Reach</label>
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
