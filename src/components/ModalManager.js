import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import SignIn from './SignIn'
// eslint-disable-next-line import/no-cycle
import CartItems from './Cart/CartItems'
import PaymentSummary from './PaymentSummary'

class ModalManager extends Component {
	render() {
		const { visibleModal } = this.props
		return (
			<Fragment>
				{(visibleModal === 'signIn' || visibleModal === 'register') && (
					<SignIn {...this.props} />
				)}
				{visibleModal === 'checkout' && <CartItems {...this.props} />}
				{visibleModal === 'paymentSummary' && <PaymentSummary {...this.props} />}
			</Fragment>
		)
	}
}

ModalManager.propTypes = {
	visibleModal: PropTypes.string.isRequired,
}
export default ModalManager
