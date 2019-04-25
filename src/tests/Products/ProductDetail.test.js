import React from 'react';
import { mount, shallow } from 'enzyme'
import { ProductDetail } from '../../components/Products/ProductDetail';
import { SecondaryTitle } from '../../ui/Typography';
import AddSubtractCta from '../../ui/number-input'


describe('ProductDetail', () => {
	it('renders expected content', () => {
		const originalError = console.error;
		console.error = jest.fn();
		const wrapper = mount(<ProductDetail productDetail={{ name: 'Test1', price: 10 }} />)
		expect(wrapper.contains(<div>Test1</div>)).toEqual(true)
		expect(wrapper.contains(<div>$ 10</div>)).toBeTruthy
		console.error = originalError;
	});

	it('calls renderProductDetails on click of the Buy Now cta', () => {
		const originalError = console.error;
		console.error = jest.fn();
		const wrapper = mount(<ProductDetail productDetail={{ name: 'Test1', price: 10 }} />)
		wrapper.instance().onChangeQuantity = jest.fn()
		const addToCartWrapper = wrapper.find(AddSubtractCta)

		addToCartWrapper.find('img').first().simulate('click')
		expect(wrapper.instance().onChangeQuantity).toHaveBeenCalled();
		console.error = originalError;
	});
})
