import React, { Component } from 'react'
import styled from 'styled-components'
import Gbr from '../assets/gbr.svg'
import ModalManager from './ModalManager'

class TopBar extends Component {
	render() {
		return (
			<TopBar.Container>
				{/* <TopBar.Nav> */}
				<TopBar.SignIn>HI! <CTAText>Sign in</CTAText> or <CTAText> Register</CTAText></TopBar.SignIn>
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
					<div>Your bag: {'£3.99'}</div>
				</TopBar.Nav>
				{/* </TopBar.Nav> */}
				{/* <ModalManager /> */}
			</TopBar.Container>
		)
	}
}
export default TopBar

const CTAText = styled.div`
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
