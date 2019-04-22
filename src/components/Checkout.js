import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCurrentUser } from '../selectors'


class Checkout extends Component {
	renderCartSummary = () => {
		const { cartItems } = this.props
		console.log('cart============>>>>>', cartItems)
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
						{cartItems.map(item => (
							<Checkout.Tr>
								<Checkout.Td>{item.name}</Checkout.Td>
								<Checkout.Td>{item.quantity}</Checkout.Td>
								<Checkout.Td>{item.price}</Checkout.Td>
							</Checkout.Tr>
						))}
					</Checkout.Table>
				</div>

			</div>
		)
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
		return (
			<Checkout.Container>
				<Checkout.Details>
					{this.renderCartSummary()}
					{this.renderAddress()}
				</Checkout.Details>
				<Checkout.Hr />
				<div> Checkout page</div>
				<div>Summary</div>
				<div>stuff</div>
			</Checkout.Container>
		)
	}
}
function mapStateToProps(state) {
	return {
		currentUser: getCurrentUser(state),
		cartItems: state.cart.cartItems
	}
}
export default connect(mapStateToProps)(Checkout)

Checkout.Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`
Checkout.Td = styled.td`
	border: none
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
