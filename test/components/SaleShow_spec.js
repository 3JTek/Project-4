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
        user: {
          business_name: 'Zara',
          categories: [],
          email: 'zara@test.com',
          hero_image: 'https://s1.qwant.com/thumbr/0x380/3/0/2224b1ba7031bf11772048fdc8a35c6837d967a2689e827fe5cfd6c516d185/visite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg?u=http%3A%2F%2Fi.f1g.fr%2Fmedia%2Fext%2F1900x1900%2Fmadame.lefigaro.fr%2Fsites%2Fdefault%2Ffiles%2Fimg%2F2017%2F04%2Fvisite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg&q=0&b=1&p=0&a=1',
          id: 1,
          location: '1234, test Lane, Test, SE1 1ER',
          logo: 'https://s2.qwant.com/thumbr/0x0/e/c/2cfc32d78af019faaed18632e1db55657c26b39c69c32de0191f26062ef778/Zara_logo_website.png?u=https%3A%2F%2Fwww.waldengalleria.com%2Fwp-content%2Fuploads%2Fsites%2F3%2F2017%2F03%2FZara_logo_website.png&q=0&b=1&p=0&a=1'
        },
        title: 'Half price coffee',
        expiry_date: '2030-05-01 9:22:54',
        content: 'For three hours only, we will be serving the best coffee for half price',
        category: {
          'id': 14,
          'type': 'Coffee'
        }
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
      <MemoryRouter initialEntries={['/sales/1']}>
        <Route path="/sales/:id" component={SalesShow} />
      </MemoryRouter>
    )
    done()
  })
  it('should render the correct HTML', done => {
    response.then(() => {
      wrapper.update()
      // console.log(wrapper.debug())
      expect(wrapper.find('.business-hero').length).to.eq(1)
      expect(wrapper.find('.business-logo').length).to.eq(1)
      expect(wrapper.find('.sale-title > h1').length).to.eq(1)
      expect(wrapper.find('.sale-title p').length).to.eq(2)
      expect(wrapper.find('.address').length).to.eq(1)
      expect(wrapper.find('address').length).to.eq(1)
    })
    done()
  })

  it('should render the correct data', done => {
    response.then(() => {
      wrapper.update()
      console.log(wrapper.debug())
      expect(wrapper.find('.business-hero').prop('style').backgroundImage).to.eq('url(https://s1.qwant.com/thumbr/0x380/3/0/2224b1ba7031bf11772048fdc8a35c6837d967a2689e827fe5cfd6c516d185/visite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg?u=http%3A%2F%2Fi.f1g.fr%2Fmedia%2Fext%2F1900x1900%2Fmadame.lefigaro.fr%2Fsites%2Fdefault%2Ffiles%2Fimg%2F2017%2F04%2Fvisite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg&q=0&b=1&p=0&a=1)')
      expect(wrapper.find('.business-logo').prop('style').backgroundImage).to.eq('url(https://s2.qwant.com/thumbr/0x0/e/c/2cfc32d78af019faaed18632e1db55657c26b39c69c32de0191f26062ef778/Zara_logo_website.png?u=https%3A%2F%2Fwww.waldengalleria.com%2Fwp-content%2Fuploads%2Fsites%2F3%2F2017%2F03%2FZara_logo_website.png&q=0&b=1&p=0&a=1)')
      expect(wrapper.find('.sale-title > h1').text()).to.eq('Half price coffee')
      expect(wrapper.find('.sale-title > p:first-child').text()).to.eq('For three hours only, we will be serving the best coffee for half price')
      expect(wrapper.find('.sale-title > p:last-child').contains(<span><strong>4074</strong>day(s) and</span>))
      expect(wrapper.find('.sale-title > p:last-child').contains(<span><strong>18</strong>hour(s)</span>))
      expect(wrapper.find('address').contains('1234, test Lane, Test, SE1 1ER'))
    })
    done()
  })
})
