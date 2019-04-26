import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCurrentUser } from '../selectors'
import { createOrder } from '../actionCreators/cart'
import Cta from '../ui/CTABtn'
import { PrimaryTitle } from '../ui/Typography'


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
				<div>
					<div>Order Summary</div>
					<Checkout.Table>
						<Checkout.Tr>
							<Checkout.Th>Item</Checkout.Th>
							<Checkout.Th>Quantity</Checkout.Th>
							<Checkout.Th>Color</Checkout.Th>
							<Checkout.Th>Price</Checkout.Th>
						</Checkout.Tr>
						<tbody>
							{cartItems.map(item => (
								<Checkout.Tr>
									<Checkout.Td>{item.name}</Checkout.Td>
									<Checkout.Td>{item.quantity}</Checkout.Td>
									<Checkout.Td>{item.color}</Checkout.Td>
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
		const { cartItems, user } = this.props
		return (
			<div>
				<PrimaryTitle>Delivery Details</PrimaryTitle>
				<div>{`Name: ${user.name}`}</div>
				<div>{`Email: ${user.email}`}</div>
				<div>{`Address Line 1: ${user.address_1}`}</div>
				<div>{user.address_2 && `Address Line 2: ${user.address_2}`}</div>
				<div>{`Day Phone: ${user.day_phone}`}</div>
				<div>{`Mobile Phone: ${user.mob_phone}`}</div>
				<div>{`Region: ${user.region}`}</div>
			</div>
		)
	}

	render() {
		const { visibleModal } = this.state
		const {
			totalPrice, shippingType, tax, push
		} = this.props
		const salesTax = tax.find(taxType => taxType.tax_id === 1)

		let paymentTotal
		if (salesTax) {
			const taxPercentage = (Number(salesTax.tax_percentage) / 100) + 1
			paymentTotal = (Number(totalPrice) * taxPercentage) + Number(shippingType.shipping_cost)
		} else {
			paymentTotal = Number(totalPrice) + Number(shippingType.shipping_cost)
		}
		return (
			<Checkout.Container>
				<Checkout.Details>
					{this.renderCartSummary()}
					{this.renderAddress()}
				</Checkout.Details>
				<Checkout.Hr />
				<div>Purchase Summary</div>
				<div>Product total: {`$ ${totalPrice}`}</div>
				<div>{`Shipping: $ ${shippingType.shipping_cost}`}</div>
				{salesTax && <div>Sales Tax: {salesTax.tax_type}</div>}
				<div>{`Total Payment: $ ${paymentTotal.toFixed(0)}`}</div>
				<Cta onClick={this.completePayment}>Complete Payment</Cta>
				{visibleModal !== null && (
					<ModalManager
						push={push}
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
	tax: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
}
function mapStateToProps(state, ownProps) {
	return {
		user: state.customers.user,
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
	background-color: #FFF;
	padding: 40px;
	@media screen and (max-width: 425px) {
		margin: 10px;
		padding: 20px;
	}
`
Checkout.Details = styled.div`
	display: flex;
	> :nth-child(1) {
		width: 50%;
		margin-right: 20px;
		@media screen and (max-width: 425px) {
			width: 100%;
		}
	}
	> :nth-child(2) {
		margin-top: 20px;
		flex: 1;
		background: #EFEFEF;
		padding: 10px 0 10px 25px;
		> div {
			margin-bottom: 10px
		}
	}
	@media screen and (max-width: 425px) {
		flex-direction: column;
  }
`
Checkout.Hr = styled.div`
	margin: 25px 55px;
	height: 4px;
	background: #E7E7E7;
`
