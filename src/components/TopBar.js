/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Usd from '../assets/usd.svg'
import ModalManager from './ModalManager'
import { getCurrentUser } from '../selectors'
import { fetchCustomer } from '../actionCreators/customers'
import { setCartContent } from '../actionCreators/cart'
import { fetchAttributes } from '../actionCreators/attributes'
import { fetchDepartments } from '../actionCreators/departments'
import { fetchCategories } from '../actionCreators/categories'

import CartUI from '../ui/cartUI'

class TopBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visibleModal: null
		}
	}

	componentDidMount() {
		const {
			dispatchFetchCustomer, dispatchSetCart, dispatchFetchAttributes, dispatchFetchDepartments, dispatchFetchCategories
		} = this.props
		dispatchFetchCustomer()
		dispatchSetCart()
		dispatchFetchAttributes()
		dispatchFetchDepartments()
		dispatchFetchCategories()
	}

	openModal = (visibleModal) => {
		this.setState({ visibleModal })
	}

	closeModal = (event) => {
		this.setState({ visibleModal: null })
	}

	render() {
		const { visibleModal } = this.state
		const { currentUser, cart: { totalPrice, cartItems } } = this.props
		return (
			<TopBar.Container>
				<TopBar.Links>
					{currentUser && currentUser.name ? (
						<div>Hello {currentUser.name}</div>
					)
						: (
							<TopBar.SignIn>HI! &nbsp;
								<CTAText onClick={() => this.openModal('signIn')}>Sign in &nbsp;</CTAText> or <CTAText onClick={() => this.openModal('register')}>&nbsp; Register</CTAText>
							</TopBar.SignIn>
						)
					}
					<TopBar.Nav mobileDisplay="none">
						<div href="#">Daily Deals</div>
						<div href="#">Sell</div>
						<div href="#">Help & Contact</div>
					</TopBar.Nav>
					<TopBar.Nav>
						<Currency>$ USD</Currency>
					</TopBar.Nav>
					<TopBar.Nav>
						<CartUI
							count={cartItems.length}
							onClick={() => this.setState({ visibleModal: 'checkout' })}
							secondary
						/>
						<div>Your bag: ${totalPrice}</div>
					</TopBar.Nav>
					{visibleModal && (
						<ModalManager
							visibleModal={visibleModal}
							closeModal={this.closeModal}
							isOpen={!!visibleModal}
						/>
					)}
				</TopBar.Links>
			</TopBar.Container>
		)
	}
}
TopBar.propTypes = {
	cart: PropTypes.object.isRequired,
	dispatchFetchCustomer: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
	dispatchSetCart: PropTypes.func.isRequired,
	dispatchFetchAttributes: PropTypes.func.isRequired,
	dispatchFetchDepartments: PropTypes.func.isRequired,
	dispatchFetchCategories: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	currentUser: state.customers.user,
	cart: state.cart,
})
const mapDispatchToProps = dispatch => ({
	dispatchFetchCustomer: bindActionCreators(fetchCustomer, dispatch),
	dispatchSetCart: bindActionCreators(setCartContent, dispatch),
	dispatchFetchAttributes: bindActionCreators(fetchAttributes, dispatch),
	dispatchFetchDepartments: bindActionCreators(fetchDepartments, dispatch),
	dispatchFetchCategories: bindActionCreators(fetchCategories, dispatch),

})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

const CTAText = styled.span`
	color: #F62F5E;
	cursor: pointer;
`
TopBar.Container = styled.div`
	font-size: 15px;
	width: 960px;
	background-color: #FFF;
	min-width: 960px;
	width: 100%;
	@media screen and (max-width: 425px) {
		width: 100%;
		min-width: unset;
		font-size: 12px;
	}
`
TopBar.Links = styled.div`
	max-width: 960px;
	margin: auto;
	font-weight: bold;
	color: #2E2E2E;
	padding: 15px 30px;
	display: flex;
  justify-content: space-between;
	@media screen and (max-width: 425px) {
		width: 93%;
		padding: 15px 10px;
	}
`
TopBar.Nav = styled.div`
	display: flex;
  justify-content: space-between;
	div:not(:last-child) {
		margin-right: 22px;
	}
	@media screen and (max-width: 425px) {
		display: ${({ mobileDisplay }) => mobileDisplay && mobileDisplay};
	}
	
`
const Currency = styled.div`
	background: url(${Usd});
	background-repeat: no-repeat;
  padding-left: 30px;
	@media screen and (max-width: 425px) {
		background-size: 20px;
	}
`
TopBar.SignIn = styled.div`
	display: flex;
	@media screen and (max-width: 425px) {
		flex-wrap: wrap;
	}
`
