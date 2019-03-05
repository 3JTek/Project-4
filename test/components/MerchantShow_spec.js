/* global describe, it, beforeEach */
import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import MerchantShow from '../../src/components/users/MerchantShow'

describe('MerchantShow tests', () => {

  let wrapper

  beforeEach(done => {
    const props = {
      business_name: 'Zara',
      categories: [],
      email: 'zara@test.com',
      hero_image: 'https://s1.qwant.com/thumbr/0x380/3/0/2224b1ba7031bf11772048fdc8a35c6837d967a2689e827fe5cfd6c516d185/visite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg?u=http%3A%2F%2Fi.f1g.fr%2Fmedia%2Fext%2F1900x1900%2Fmadame.lefigaro.fr%2Fsites%2Fdefault%2Ffiles%2Fimg%2F2017%2F04%2Fvisite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg&q=0&b=1&p=0&a=1',
      id: 1,
      location: '1234, test Lane, Test, SE1 1ER',
      logo: 'https://s2.qwant.com/thumbr/0x0/e/c/2cfc32d78af019faaed18632e1db55657c26b39c69c32de0191f26062ef778/Zara_logo_website.png?u=https%3A%2F%2Fwww.waldengalleria.com%2Fwp-content%2Fuploads%2Fsites%2F3%2F2017%2F03%2FZara_logo_website.png&q=0&b=1&p=0&a=1',
      sales: [
        {
          expiry_date: '2019-03-03 18:25:27',
          id: 2,
          title: 'Winter collection 50% Off'
        },
        {
          expiry_date: '2019-03-07 07:01:11',
          id: 3,
          title: 'Best opportunity to meet half price service providers.'
        }
      ]
    }

    wrapper = shallow(< MerchantShow {...props} />)
    done()
  })
  it('should render the correct HTML', done => {
    expect(wrapper.find('.business-hero').length).to.eq(1)
    expect(wrapper.find('.business-logo').length).to.eq(1)
    expect(wrapper.find('.business-name').length).to.eq(1)
    expect(wrapper.find('.email').length).to.eq(1)
    expect(wrapper.find('.address').length).to.eq(1)
    expect(wrapper.find('button').length).to.eq(1)

    done()
  })

  it('should render the correct data', done => {
    expect(wrapper.find('.business-hero').prop('style').backgroundImage).to.eq('url(https://s1.qwant.com/thumbr/0x380/3/0/2224b1ba7031bf11772048fdc8a35c6837d967a2689e827fe5cfd6c516d185/visite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg?u=http%3A%2F%2Fi.f1g.fr%2Fmedia%2Fext%2F1900x1900%2Fmadame.lefigaro.fr%2Fsites%2Fdefault%2Ffiles%2Fimg%2F2017%2F04%2Fvisite-en-images-du-plus-grand-magasin-zara-de-france-photo-4.jpg&q=0&b=1&p=0&a=1)')
    expect(wrapper.find('.business-logo').prop('style').backgroundImage).to.eq('url(https://s2.qwant.com/thumbr/0x0/e/c/2cfc32d78af019faaed18632e1db55657c26b39c69c32de0191f26062ef778/Zara_logo_website.png?u=https%3A%2F%2Fwww.waldengalleria.com%2Fwp-content%2Fuploads%2Fsites%2F3%2F2017%2F03%2FZara_logo_website.png&q=0&b=1&p=0&a=1)')
    expect(wrapper.find('.business-name').text()).to.eq('Zara')
    expect(wrapper.find('.email').text()).to.eq('zara@test.com')
    expect(wrapper.find('.address').text()).to.eq('1234, test Lane, Test, SE1 1ER')
    expect(wrapper.find({ to: '/sales/2/Winter-collection-50percent-Off'
    }).length).to.eq(1)
    expect(wrapper.find({ to: '/sales/3/Best-opportunity-to-meet-half-price-service-providers.' }).length).to.eq(1)
    expect(wrapper.find('button').text()).to.eq('Create a New Sale')
    done()
  })


})
