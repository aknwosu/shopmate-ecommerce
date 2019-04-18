import React, { Component } from 'react'
import styled from 'styled-components'
import ModalManager from './ModalManager'

class TopBar extends Component {
	render() {
		return (
			<Container>
				<div>HI! <CTAText>Sign in</CTAText> or <CTAText> Register</CTAText></div>
				<ModalManager />
			</Container>
		)
	}
}
export default TopBar

const CTAText = styled.span`
	color: #F62F5E
`
const Container = styled.div`
	width: 100%;
	font-size: 15px;
	font-weight: bold;
	color: #2E2E2E;
	padding: 15px 30px;
`
