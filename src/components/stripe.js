import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import Cta from '../ui/CTABtn'
import { ErrorText } from '../ui/Typography'

// import { injectStripe } from 'react-stripe-elements'
class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			paymentCompleted: false,
			paymentError: false
		}
	}

	completedPayment = () => {
		const { push } = this.props
		localStorage.removeItem('cartItems', 'totalPrice')
		push('/products')
	}

	async submit(ev) {
		const {
			stripe, totalPrice, shippingType, tax, orderID
		} = this.props
		const salesTax = tax.find(taxType => taxType.tax_id === 1)
		// let paymentTotal = Number(totalPrice) + Number(shippingType.shipping_cost)
		let totalPayment
		if (salesTax) {
			const taxPercentage = (Number(salesTax.tax_percentage) / 100) + 1
			totalPayment = (Number(totalPrice) * taxPercentage) + Number(shippingType.shipping_cost)
		} else {
			totalPayment = Number(totalPrice) + Number(shippingType.shipping_cost)
		}

		const { token } = await stripe.createToken();
		const data = {
			stripeToken: token.id,
			order_id: orderID,
			description: `SHOPMATE ORDER: ${orderID}`,
			amount: totalPayment.toFixed(),
		}
		const response = await axios({
			method: 'post',
			url: 'https://backendapi.turing.com/stripe/charge',
			headers: { 'Content-Type': 'application/json', 	'user-key': localStorage.getItem('accessToken'), },
			data
		});
		console.log('response from paid', response.paid)
		// if (response.paid === true) this.setState({ paymentCompleted: 'true' })
		if (response.status === 200) {
			this.setState({ paymentCompleted: true })
		} else {
			this.setState({ paymentError: true })
		}
	}

	render() {
		const { paymentCompleted, paymentError } = this.state
		const { orderID, push } = this.props
		return (
			<div className="checkout">
				<p>{`Payment for Order ID: ${orderID}`}</p>
				<CardElement style={{ base: { fontSize: '18px' } }} />

				{/* <StyledCta onClick={this.submit}>Pay</StyledCta> */}
				<Fragment>
					{ paymentCompleted ? (
						<CheckoutForm.Complete>
							<div>Payment Complete</div>
							<StyledCta onClick={this.completedPayment}>Okay</StyledCta>
						</CheckoutForm.Complete>
					)
						: (
							<StyledCta onClick={this.submit}>Pay</StyledCta>
						)
					}
					{paymentError && <ErrorText>An error occured with your payment. Please try again</ErrorText>}
				</Fragment>

			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	console.log('paidpaidpaidpaidpaid', ownProps)
	return ({
		currentUser: state.customers.user,
		shippingType: state.shipping.shippingType,
		totalPrice: state.cart.totalPrice,
		tax: state.shipping.tax,
		orderID: state.order.orderID,
		push: ownProps.push
	})
}
export default connect(mapStateToProps)(injectStripe(CheckoutForm))

const StyledCta = styled(Cta)`
	width: 150px;
	margin: 40px auto;
	font-size: 18px;
`
CheckoutForm.Complete = styled.div`
	margin-top: 50px;
	align-items: center;
	display: flex;
	flex-direction: column;
`
