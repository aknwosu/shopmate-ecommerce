import React from 'react';
import { mount } from 'enzyme'
import { Home } from '../components/Home';

describe('Home Page', () => {
	it('renders expected content', () => {
		const originalError = console.error;
  	console.error = jest.fn();
		const wrapper = mount(<Home history={{ push: () => {} }} />)
		const title = wrapper.find('h1').first().text()
		const firstCta = wrapper.find('button').first().text()
		expect(title).toEqual('BackGround and  Development')
		expect(firstCta).toEqual('View All')
		console.error = originalError;
	});

	it('calls push on click of the View all cta', () => {
		const originalError = console.error;
  	console.error = jest.fn();
		const push = jest.fn()
		const wrapper = mount(<Home history={{ push }} />)
		wrapper.find('button').first().simulate('click')
		expect(push).toHaveBeenCalledWith('/products');
		console.error = originalError;
	});
})
