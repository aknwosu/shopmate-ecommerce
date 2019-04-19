import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignIn from './SignIn'
import Checkout from './Checkout'
import PaymentSummary from './PaymentSummary'

class ModalManager extends Component {
	render() {
		const { visibleModal, closeModal } = this.props
		console.log('modal manager')
		return (
			<div>
				<div>Modals</div>
				{(visibleModal === 'signIn' || visibleModal === 'register') && (
					<SignIn {...this.props} />
				)}
				{visibleModal === 'checkout' && <Checkout {...this.props} />}
				{visibleModal === 'paymentSummary' && <PaymentSummary {...this.props} />}
			</div>
		)
	}
}

ModalManager.propTypes = {
	visibleModal: PropTypes.string.isRequired,
	// onClose: PropTypes.func.isRequired,
	// CTA: PropTypes.func.isRequired
}
export default ModalManager
