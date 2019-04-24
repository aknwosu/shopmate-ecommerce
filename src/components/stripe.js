import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import Cta from '../ui/CTABtn'

// import { injectStripe } from 'react-stripe-elements'
class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		const {
			stripe, totalPrice, shippingType, tax
		} = this.props
		let totalPayment = Number(totalPrice) + Number(shippingType.shipping_cost)
		const salesTax = tax.find(taxType => taxType.tax_id === 1)
		// let paymentTotal = Number(totalPrice) + Number(shippingType.shipping_cost)
		if (salesTax) {
			const taxPercentage = (Number(salesTax.tax_percentage) / 100) + 1
			totalPayment *= taxPercentage
		}
		const { token } = await stripe.createToken();
		const data = {
			stripeToken: token.id,
			order_id: 1,
			description: 1,
			amount: totalPayment,
		}
		const response = await axios({
			method: 'post',
			url: 'https://backendapi.turing.com/stripe/charge',
			headers: { 'Content-Type': 'application/json', 	'user-key': localStorage.getItem('accessToken'), },
			data
		});
		if (response.status === 200) console.log('Purchase Complete!')
	}

	render() {
		return (
			<div className="checkout">
				<p>Payment Information</p>
				<CardElement style={{ base: { fontSize: '18px' } }} />

				<StyledCta onClick={this.submit}>Pay</StyledCta>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	currentUser: state.customers.user,
	shippingType: state.shipping.shippingType,
	totalPrice: state.cart.totalPrice,
	tax: state.shipping.tax
})
export default connect(mapStateToProps)(injectStripe(CheckoutForm))

const StyledCta = styled(Cta)`
	width: 150px;
	margin: 40px auto;
	font-size: 18px;
`
