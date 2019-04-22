import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class Checkout extends Component {
	renderCartSummary = () => {
		const { cart } = this.props
	}

	render() {
		return (
			<div>
				{this.renderCartSummary()}
				<div> Checkout page</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		currentUser: getCurrentUser(state),
		cart: state.cart,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
