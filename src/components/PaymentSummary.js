import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import CheckoutForm from './stripe'

import Modal from '../ui/ModalBase'
import { fetchOrder } from '../actionCreators/cart'


class PaySummary extends Component {
	componentDidMount() {
	}

	render() {
		const {
			closeModal, totalPrice, shippingType, push
		} = this.props
		return (
			<StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
				<Modal handleClose={closeModal}>
					<PaySummary.Container>
						<h1>Payment</h1>
						<Elements>
							<CheckoutForm push={push} />
						</Elements>
					</PaySummary.Container>
				</Modal>
			</StripeProvider>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
		currentUser: state.customers.user,
		shippingType: state.shipping.shippingType,
		totalPrice: state.cart.totalPrice,
		orderID: state.order.orderID,
		push: ownProps.push
	})
const mapDispatchToProps = dispatch => ({
	dispatchFetchOrder: bindActionCreators(fetchOrder, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(PaySummary)

PaySummary.Container = styled.div`
	height: 400px
	width: 420px;
	padding: 0 30px;
	display: flex;
	flex-direction: column;
`
