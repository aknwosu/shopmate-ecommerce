import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { fetchProducts } from '../../actionCreators/products'
import {
	subtractFromCart, addToCart, generateUniqueCartId, deleteCartItem
} from '../../actionCreators/cart'
import { getCurrentUser } from '../../selectors'
import Modal from '../../ui/ModalBase'
import Cta from '../../ui/CTABtn'
import ModalManager from '../ModalManager'
import AddSubtractCta from '../../ui/number-input'
import ColorPicker from '../../ui/colorPicker'
import CartItem from './Item'

class CartItems extends Component {
	constructor(props) {
		super(props)
		this.state = {
			renderedModal: null
		}
	}

	onChangeQuantity = (value, item) => {
		console.log('changed cart item quantity', value, item)
		// this.props.dispatchSubtractFromCart()
	}

	proceedToCheckout = () => {
		const { currentUser, push, dispatchGenerateUniqueCartId } = this.props
		if (!currentUser.customer_id) {
			return this.renderProfile('signIn')
		}

		dispatchGenerateUniqueCartId()
		return push('/checkout')
	}

	closeModal = () => {
		this.setState({ renderedModal: null })
	}

	renderProfile = (modalName) => {
		// this.props.closeModal()
		this.setState(prevState => ({
			renderedModal: modalName
		}))
		// this.setState({ renderedModal: null }).then
	}

	renderCartItems = () => {
		const {
			dispatchSubtractFromCart, dispatchAddToCart, dispatchDeleteCartItem, cart: { cartItems }
		} = this.props

		return (
			cartItems.map(item => <CartItem dispatchDeleteCartItem={dispatchDeleteCartItem} dispatchAddToCart={dispatchAddToCart} cartItem={item} />)
		)
	}

	render() {
		const {
			cart, visibleModal, closeModal, isOpen
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
						<div>hello from checkout</div>
						{this.renderCartItems()}
						<div>{cart.totalPrice}</div>
						<Cta
							onClick={() => {}}
						>Checkout Here!!!
						</Cta>
						{/* <Cta
							onClick={() => this.setState({ renderedModal: 'paymentSummary' })}
						>Checkout Here!!!
						</Cta> */}
						<Cta
							onClick={this.proceedToCheckout}
						>Proceed to Checkout
						</Cta>
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
}
function mapStateToProps(state, ownProps) {
	return {
		currentUser: getCurrentUser(state),
		cart: state.cart,
		products: state.products.allProducts,
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchSubtractFromCart: bindActionCreators(subtractFromCart, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchDeleteCartItem: bindActionCreators(deleteCartItem, dispatch),
	dispatchGenerateUniqueCartId: bindActionCreators(generateUniqueCartId, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)

CartItems.Container = styled.div`
	width: 940px;
`
