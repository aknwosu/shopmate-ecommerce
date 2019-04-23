import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CartIcon from '../assets/cart_icon.svg'
import CartIconDark from '../assets/cart_icon_dark.svg'

const CartUI = (props) => {
	const { count, secondary } = props

	return (
		<CartUI.Container {...props}>
			<img src={secondary ? CartIconDark : CartIcon} alt="cart" />
			<CartUI.ItemsCount>{count}</CartUI.ItemsCount>
		</CartUI.Container>
	)
}

CartUI.propTypes = {
	count: PropTypes.number,
	secondary: PropTypes.bool
}

CartUI.defaultProps = {
	count: 0,
}

export default CartUI

CartUI.Container = styled.div`
	position: relative;
  bottom: 0;
	width: 29px;
	cursor: pointer;
`
CartUI.ItemsCount = styled.div`
	text-align: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: #f62f5e;
	color: #ffffff;
	font-family: "Montserrat", sans-serif;
	font-weight: bold;
	display: flex;
	font-size: 11px;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 11px;
  left: 9px;
`
