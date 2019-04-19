import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { fetchProducts } from '../actionCreators/products'
import { getCurrentUser } from '../selectors'
import Modal from '../ui/ModalBase'
import Cta from '../ui/CTABtn'
import ModalManager from './ModalManager'


class Checkout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			renderedModal: null
		}
	}

	render() {
		const {
			cart, visibleModal, closeModal, isOpen
		} = this.props
		const { renderedModal } = this.state
		// console.log(this.props)
		return (
			<Fragment>
				<Modal
					visibleModal={visibleModal}
					isOpen={isOpen}
					handleClose={closeModal}
				>
					<div>hello from checkout</div>
					<div>{cart.totalPrice}</div>
					<Cta
						onClick={() => this.setState({ renderedModal: 'paymentSummary' })}
					>Checkout Here!!!
					</Cta>

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
Checkout.propTypes = {
	cart: PropTypes.object.isRequired,
	visibleModal: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.bool.isRequired,
}
function mapStateToProps(state) {
	return {
		currentUser: getCurrentUser(state),
		cart: state.cart,
		products: state.products.allProducts
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
