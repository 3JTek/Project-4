import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'

import Loading from '../common/Loading'
import Flash from '../../lib/Flash'
import Auth from '../../lib/Auth'

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
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
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

  componentDidMount(){
    axios(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(({data}) => this.setState({newSale: {...this.state.newSale, user: data}}))

      .catch(({response}) => this.setState({...response}))

    axios.get('/api/categories')
      .then(({data}) => this.setState({ categories: data }))
  }

  render(){
    if(!this.state.categories) return <Loading/>
    const { title, content, sale_fees, expiry_date} = this.state.newSale // eslint-disable-line
    return(
      <section>
        <section>
          <div
            className="business-hero"
            style={{backgroundImage: 'url("https://s2.qwant.com/thumbr/0x0/6/5/af0ed2715779781ecbe6b6b34b3b5ec6e09bfcc18deda99ec3f3268a0ef770/01597b814ecb489.jpg?u=https%3A%2F%2Fpng.pngtree.com%2Fthumb_back%2Ffw800%2Fback_pic%2F05%2F08%2F26%2F01597b814ecb489.jpg&q=0&b=1&p=0&a=1")'}}>
          </div>
        </section>
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
                  <div className="field">
                    <label className="label">Category</label>
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
                <p>The fees for this sale is <strong>£ {sale_fees/*eslint-disable-line*/}</strong></p>
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
                <h1 className="title is-4">Map Goes here</h1>
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
