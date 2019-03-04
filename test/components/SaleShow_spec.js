/* global describe, it, before, after, beforeEach*/
import React from 'react'
import Promise from 'bluebird'
import axios from 'axios'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import SalesShow from '../../src/components/sales/SalesShow'

describe('SalesShow tests', () => {
  let wrapper, response

  before(done => {
    response = Promise.resolve({
      data: {
        _id: 1,
        category: 'Clothes',
        content: 'this is some content',
        expiry_date: '10th November 2019',
        title: 'Test sale',
        user: 'Test'
      }
    })


    sinon.stub(axios, 'get').returns(response)
    done()
  })
  after(done => {
    axios.get.restore()
    done()
  })

  beforeEach(done => {
    wrapper= mount(
      <MemoryRouter initialEntries={['/cheeses/1']}>
        <Route path="/sales/:id" component={SalesShow} />
      </MemoryRouter>
    )
    done()
  })
  it('should render the correct HTML', done => {
    response.then(() => {
      wrapper.update()
      expect(wrapper.find('.section .container h1.title').text()).to.eq('Test Sale')
      done()
    })
  })
})
