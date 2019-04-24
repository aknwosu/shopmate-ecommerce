import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCurrentUser } from '../selectors'
import { createOrder } from '../actionCreators/cart'

import ModalManager from './ModalManager'

class Checkout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visibleModal: null
		}
	}

	componentDidUpdate() {
		const { shippingType, push } = this.props
		if (!shippingType.shipping_id) {
			push('/updateAddress')
		}
	}

	renderCartSummary = () => {
		const { cartItems } = this.props
		return (
			<div>
				<div>Checkout</div>
				<div>
					<div>Order Summary</div>
					<Checkout.Table>
						<Checkout.Tr>
							<Checkout.Th>Item</Checkout.Th>
							<Checkout.Th>Quantity</Checkout.Th>
							<Checkout.Th>Price</Checkout.Th>
						</Checkout.Tr>
						<tbody>
							{cartItems.map(item => (
								<Checkout.Tr>
									<Checkout.Td>{item.name}</Checkout.Td>
									<Checkout.Td>{item.quantity}</Checkout.Td>
									<Checkout.Td>{item.price}</Checkout.Td>
								</Checkout.Tr>
							))}
						</tbody>
					</Checkout.Table>
				</div>

			</div>
		)
	}

	completePayment = () => {
		const { dispatchCreateOrder } = this.props
		dispatchCreateOrder()
		this.setState({ visibleModal: 'paymentSummary' })
	}

	renderAddress = () => {
		const { cartItems } = this.props
		return (
			<div>
				<div>Delivery</div>
			</div>
		)
	}

	render() {
		const { visibleModal } = this.state
		const { totalPrice, shippingType, tax } = this.props
		const salesTax = tax.find(taxType => taxType.tax_id === 1)
		let paymentTotal = Number(totalPrice) + Number(shippingType.shipping_cost)
		if (salesTax) {
			const taxPercentage = (Number(salesTax.tax_percentage) / 100) + 1
			paymentTotal *= taxPercentage
		}
		return (
			<Checkout.Container>
				<Checkout.Details>
					{this.renderCartSummary()}
					{this.renderAddress()}
				</Checkout.Details>
				<Checkout.Hr />
				<div> Checkout page</div>
				<div>Summary</div>
				<div>Product total: {`$ ${totalPrice}`}</div>
				<div>{`Shipping: $ ${shippingType.shipping_cost}`}</div>
				{salesTax && <div>Sales Tax: {salesTax.tax_type}</div>}
				<div>{`Total Payment: $ ${paymentTotal}`}</div>
				<div>stuff</div>
				<div onClick={this.completePayment}>Complete Payment</div>
				{visibleModal !== null && (
					<ModalManager
						visibleModal={visibleModal}
						isOpen={!!visibleModal}
						closeModal={() => this.setState({ visibleModal: null })}
					/>
				)}
			</Checkout.Container>
		)
	}
}
Checkout.propTypes = {
	cartItems: PropTypes.array.isRequired,
	totalPrice: PropTypes.number.isRequired,
	push: PropTypes.func.isRequired,
	shippingType: PropTypes.object.isRequired,
	dispatchCreateOrder: PropTypes.func.isRequired,
	tax: PropTypes.object.isRequired,
}
function mapStateToProps(state, ownProps) {
	return {
		cartItems: state.cart.cartItems,
		totalPrice: state.cart.totalPrice,
		shippingType: state.shipping.shippingType,
		push: ownProps.history.push,
		tax: state.shipping.tax
	}
}
const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatchCreateOrder: bindActionCreators(createOrder, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

Checkout.Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`
Checkout.Td = styled.td`
	border: none;
  text-align: left;
  padding: 8px;
`
Checkout.Th = styled.th`
	border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`
Checkout.Tr = styled.tr`
	:nth-child(even) {
  	background-color: #EFEFEF;
	}
`
Checkout.Container = styled.div`
	margin: 50px;
`
Checkout.Details = styled.div`
	display: flex;
	> :nth-child(1) {
		width: 50%;
		margin-right: 20px;
	}
	> :nth-child(2) {
		flex: 1;
		background:grey
	}
`
Checkout.Hr = styled.div`
	margin: 25px 55px;
	height: 4px;
	background: #E7E7E7;
`
