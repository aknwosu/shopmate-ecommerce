import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import AddSubtractCta from '../../ui/number-input'

const CartItem = (props) => {
	const {
		dispatchSubtractFromCart, dispatchAddToCart, cartItem: {price, actualPrice, product_id, image, name, quantity, color, size }
	} = props
	const { REACT_APP_IMAGE_URL } = process.env

	const onChangeQuantity = (value) => {
		console.log('changed cart item quantity', value)
		const cartItem = {
			product_id,
			name,
			quantity: value,
			actualPrice,
			price: Number(price) - actualPrice,
			color,
			size,
			image
		}
		dispatchAddToCart(cartItem)
	}
	return (
		<CartItem.Detail>
			<CartItem.Image src={`${REACT_APP_IMAGE_URL}${image}`} alt={image} />
			<div>
				<CartItem.Name>{name}</CartItem.Name>
				<CartItem.Attr>
					<div>Color: &nbsp;<span>{color}</span></div>
					<div>Size: &nbsp;<span>{size}</span></div>
				</CartItem.Attr>
			</div>
			<AddSubtractCta
				min={1}
				value={quantity}
				onChange={(value, item) => { onChangeQuantity(value, item) }}
			/>
			<div>delete</div>
		</CartItem.Detail>
	)
}
export default CartItem
CartItem.Image = styled.img`
	height: 90px;
	width: 90px;
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