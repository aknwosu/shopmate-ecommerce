import React, { Component, Fragment } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import Cta from '../ui/CTABtn'
import { ErrorText } from '../ui/Typography'
import { clearCart } from '../actionCreators/cart'

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
		const { push, dispatchClearCart } = this.props
		localStorage.removeItem('cartItems', 'totalPrice')
		dispatchClearCart()
		push('/products')
	}

	async submit(ev) {
		try {
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
				amount: totalPayment.toFixed() * 100,
			}
			const response = await axios({
				method: 'post',
				url: 'https://backendapi.turing.com/stripe/charge',
				headers: { 'Content-Type': 'application/json', 	'user-key': localStorage.getItem('accessToken'), },
				data
			});
			this.setState({ paymentCompleted: true, paymentError: false })
		} catch (error) {
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
const mapStateToProps = (state, ownProps) => ({
	currentUser: state.customers.user,
	shippingType: state.shipping.shippingType,
	totalPrice: state.cart.totalPrice,
	tax: state.shipping.tax,
	orderID: state.order.orderID,
	push: ownProps.push,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatchClearCart: bindActionCreators(clearCart, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm))

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
