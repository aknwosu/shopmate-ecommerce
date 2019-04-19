/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Gbr from '../assets/gbr.svg'
import ModalManager from './ModalManager'
import { getCurrentUser } from '../selectors'
import { fetchCustomer } from '../actionCreators/customers'
import { setCartContent } from '../actionCreators/cart'


class TopBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visibleModal: null
		}
	}

	componentDidMount() {
		const { dispatchFetchCustomer, dispatchSetCart } = this.props
		dispatchFetchCustomer()
		dispatchSetCart()
	}

	openModal = (visibleModal) => {
		console.log('visiblemodal=====', visibleModal)
		this.setState({ visibleModal })
	}

	closeModal = (event) => {
		this.setState({ visibleModal: null })
	}

	render() {
		const { visibleModal } = this.state
		const { currentUser, cart: { totalPrice } } = this.props
		console.log('this.props top bar====', this.props)
		return (
			<TopBar.Container>
				{currentUser && currentUser.name ? (
					<div>Hello {currentUser.name}</div>
				)
					: (
						<TopBar.SignIn>HI! &nbsp;
							<CTAText onClick={() => this.openModal('signIn')}>Sign in &nbsp;</CTAText> or <CTAText onClick={() => this.openModal('register')}>&nbsp; Register</CTAText>
						</TopBar.SignIn>
					)
				}

				<TopBar.Nav>
					<div href="#">Daily Deals</div>
					<div href="#">Sell</div>
					<div href="#">Help & Contact</div>
				</TopBar.Nav>
				<TopBar.Nav>
					<Currency>£ GBP</Currency>
				</TopBar.Nav>
				<TopBar.Nav>
					<div>stuff</div>
					<div>Your bag: ${totalPrice}</div>
				</TopBar.Nav>
				{visibleModal && (
					<ModalManager
						visibleModal={visibleModal}
						closeModal={this.closeModal}
						isOpen={!!visibleModal}
					/>
				)}
			</TopBar.Container>
		)
	}
}
const mapStateToProps = state => ({
	currentUser: getCurrentUser(state),
	cart: state.cart,
})
const mapDispatchToProps = dispatch => ({
	dispatchFetchCustomer: bindActionCreators(fetchCustomer, dispatch),
	dispatchSetCart: bindActionCreators(setCartContent, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

const CTAText = styled.span`
	color: #F62F5E
`
TopBar.Container = styled.div`
	/* width: 100%; */
	font-size: 15px;
	font-weight: bold;
	color: #2E2E2E;
	padding: 15px 30px;
	display: flex;
  justify-content: space-between;
	background-color: white;
`
TopBar.Nav = styled.div`
	display: flex;
  justify-content: space-between;
	div:not(:last-child) {
		margin-right: 22px;
	}
`
const Currency = styled.div`
	background: url(${Gbr});
	background-repeat: no-repeat;
  padding-left: 30px;
`
TopBar.SignIn = styled.div`
	display: flex;
`
