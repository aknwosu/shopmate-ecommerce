import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import AddSubtractCta from '../../ui/number-input'
import Remove from '../../assets/remove.svg'

const CartItem = (props) => {
	const {
		dispatchAddToCart, dispatchDeleteCartItem, cartItem, cartItem: {
			price, actualPrice, product_id, image, name, quantity, color, size
		}
	} = props
	const { REACT_APP_IMAGE_URL } = process.env

	const onChangeQuantity = (value, type) => {
		if (value < 1) return
		const cartItem = {
			product_id,
			name,
			quantity: type === 'subtract' ? -1 : 1,
			actualPrice,
			price: type === 'subtract' ? -actualPrice : actualPrice,
			color,
			size,
			image
		}
		dispatchAddToCart(cartItem)
	}
	return (
		<CartItem.Detail>
			<CartItem.Image src={`${REACT_APP_IMAGE_URL}${image}`} alt={image} />
			<CartItem.Info>
				<CartItem.Name>{name}</CartItem.Name>
				<CartItem.Attr>
					<div>Color: &nbsp;<span>{color}</span></div>
					<div>Size: &nbsp;<span>{size}</span></div>
				</CartItem.Attr>
			</CartItem.Info>
			<AddSubtractCta
				min={1}
				value={quantity}
				onChange={(value, type) => { onChangeQuantity(value, type) }}
			/>
			<CartItem.Delete onClick={() => { dispatchDeleteCartItem(cartItem) }} />
		</CartItem.Detail>
	)
}
CartItem.propTypes = {
	dispatchAddToCart: PropTypes.func.isRequired,
	dispatchDeleteCartItem: PropTypes.func.isRequired,
	cartItem: PropTypes.object.isRequired,
}
export default CartItem

CartItem.Image = styled.img`
	height: 60px;
	width: 65px;
	@media screen and (max-width: 425px) {
		height: 50px;
		width: 55px;
  }
`
CartItem.Detail = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 25px;
	text-align: center;
	align-items: center;
`
CartItem.Name = styled.div`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 10px;
`
CartItem.Info = styled.div`
	width: 30%;
	text-align: left;
	margin-left: 20px;
  @media screen and (max-width: 425px;) {
   	margin-left: unset;
  }
`
CartItem.Attr = styled.div`
	>	div {
		font-size: 14px;
		display: flex;
		font-weight: bold
		> span {
			font-weight: normal;
		}
	}
`
CartItem.Delete = styled.div`
	background: url(${Remove});
	height: 24px;
	width: 24px;
	margin: auto;
`
