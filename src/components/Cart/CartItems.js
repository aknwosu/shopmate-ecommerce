import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { fetchProducts } from '../../actionCreators/products'
import {
	subtractFromCart, addToCart, generateUniqueCartId, deleteCartItem
} from '../../actionCreators/cart'
import { getCurrentUser } from '../../selectors'
import Modal from '../../ui/ModalBase'
import Cta from '../../ui/CTABtn'
// eslint-disable-next-line import/no-cycle
import ModalManager from '../ModalManager'
import CartItem from './Item'
import { PrimaryTitle } from '../../ui/Typography'

class CartItems extends Component {
	constructor(props) {
		super(props)
		this.state = {
			renderedModal: null
		}
	}

	backToProducts = () => {
		const { push, closeModal } = this.props
		closeModal();
		push('/products')
	}

	proceedToCheckout = () => {
		const {
			currentUser, push, dispatchGenerateUniqueCartId, closeModal
		} = this.props
		if (!currentUser.customer_id) {
			return this.renderProfile('signIn')
		}
		closeModal()
		return push('/updateAddress')
	}

	renderProfile = (modalName) => {
		this.setState(prevState => ({
			renderedModal: modalName
		}))
	}

	renderCartItems = () => {
		const {
			dispatchAddToCart, dispatchDeleteCartItem, cart: { cartItems }
		} = this.props

		return (
			cartItems.map(item => <CartItem dispatchDeleteCartItem={dispatchDeleteCartItem} dispatchAddToCart={dispatchAddToCart} cartItem={item} />)
		)
	}

	render() {
		const {
			cart, cart: { totalPrice, cartItems }, visibleModal, closeModal, isOpen, push
		} = this.props
		const { renderedModal } = this.state
		return (
			<Fragment>
				<Modal
					visibleModal={visibleModal}
					isOpen={isOpen}
					handleClose={closeModal}
				>
					<CartItems.Container>
						<CartItems.Title>
							<div>{`${cartItems.length} Items in Your Cart`}</div>
							<div>{`$ ${totalPrice}`}</div>
						</CartItems.Title>
						{this.renderCartItems()}
						<CartItems.CtaGroup>
							<Cta
								onClick={this.backToProducts}
							>Back to Shop
							</Cta>
							<Cta
								onClick={this.proceedToCheckout}
							>Proceed to Checkout
							</Cta>
						</CartItems.CtaGroup>
					</CartItems.Container>
				</Modal>
				{renderedModal !== null && (
					<ModalManager
						visibleModal={renderedModal}
						isOpen={!!renderedModal}
						closeModal={() => this.setState({ renderedModal: null })}
					/>
				)}
			</Fragment>
		)
	}
}
CartItems.propTypes = {
	cart: PropTypes.object.isRequired,
	visibleModal: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	dispatchGenerateUniqueCartId: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	dispatchAddToCart: PropTypes.func.isRequired,
	dispatchDeleteCartItem: PropTypes.func.isRequired,
	currentUser: PropTypes.object,
}
function mapStateToProps(state, ownProps) {
	return {
		// currentUser: getCurrentUser(state),
		currentUser: state.customers.user,
		cart: state.cart,
		products: state.products.allProducts,
		push: ownProps.history.push,
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchSubtractFromCart: bindActionCreators(subtractFromCart, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchDeleteCartItem: bindActionCreators(deleteCartItem, dispatch),
	dispatchGenerateUniqueCartId: bindActionCreators(generateUniqueCartId, dispatch)

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItems))

CartItems.Container = styled.div`
	width: 940px;
	@media screen and (max-width: 425px) {
		width: 100vw;
    max-height: 630px;
    overflow: scroll;
	}
	`
CartItems.Title = styled(PrimaryTitle)`
	margin-bottom: 25px;
	margin-top: 25px;
	border-bottom: 2px solid;
	padding: 20px;
	font-size: 25px;
	display: flex;
  justify-content: space-between;
	@media screen and (max-width: 425px) {
		width: 91%;
		font-size: 16px;
	}
`
CartItems.CtaGroup = styled.div`
	background-color: #EFEFEF;
	padding: 20px;
	justify-content: space-between;
	display: flex;
`
