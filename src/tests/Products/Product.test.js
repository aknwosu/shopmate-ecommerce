import React from 'react';
import { mount } from 'enzyme'
import { Product } from '../../components/Products/Product';
import { SecondaryTitle } from '../../ui/Typography';

describe('Product Test', () => {
	it('renders expected content', () => {
		const originalError = console.error;
		console.error = jest.fn();
		const wrapper = mount(<Product product={{ name: 'Test1', price: 10 }} />)
		const name = wrapper.find('h1').first().text()
		const price = wrapper.find(SecondaryTitle).text()
		const firstCta = wrapper.find('button').first().text()
		expect(name).toEqual('Test1')
		expect(price).toEqual('$ 10')
		expect(firstCta).toEqual('Buy Now')
		console.error = originalError;
	});

	it('calls renderProductDetails on click of the Buy Now cta', () => {
		const originalError = console.error;
		console.error = jest.fn();
		const renderProductDetails = jest.fn()
		const wrapper = mount(<Product product={{ name: 'Test1', product_id: 111, price: 10 }} renderProductDetails={renderProductDetails} />)
		wrapper.find('button').first().simulate('click')
		expect(renderProductDetails).toHaveBeenCalledWith(111);
		console.error = originalError;
	});
})
