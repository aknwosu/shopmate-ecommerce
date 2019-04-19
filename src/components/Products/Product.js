import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const Product = (props) => {
	const { REACT_APP_IMAGE_URL } = process.env
	const { onAddToCart, product, product: { name, thumbnail } } = props
	// console.log(product)
	return (
		<Product.Container>
			<Product.Info>
				<Product.Image url={`${REACT_APP_IMAGE_URL}${thumbnail}`} alt={thumbnail} />
				<div onClick={() => onAddToCart(product)}>{name}</div>
			</Product.Info>
		</Product.Container>
	)
}
Product.propTypes = {
	product: PropTypes.object.isRequired
}
export default Product

Product.Container = styled.div`
  width: 220px;
  height: 336px;
  border: 1px solid green;
  margin-bottom: 25px;
  background-color: white;
  :hover {
    background-color: pink;
  }
`
Product.Image = styled.div`
  background-image: url(${props => props.url});
  height: 163px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 163px;
  margin: 20px auto;
`
Product.Info = styled.div`
`
