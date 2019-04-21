import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Cta from '../../ui/CTABtn'
import { SecondaryTitle, PrimaryTitle } from '../../ui/Typography'

export const Product = (props) => {
	const { REACT_APP_IMAGE_URL } = process.env
	const {
		onAddToCart, renderProductDetails, product, product: {
			price, product_id, name, thumbnail, errors
		}
	} = props
	return (
		<Product.Container>
			<Product.Info>
				<Product.Image url={`${REACT_APP_IMAGE_URL}${thumbnail}`} alt={thumbnail} />
				<PrimaryTitle onClick={() => onAddToCart(product)}>{name}</PrimaryTitle>
				<SecondaryTitle>{`$ ${price}`}</SecondaryTitle>
				<Product.StyledCta onClick={() => renderProductDetails(product_id)}>Buy Now</Product.StyledCta>
			</Product.Info>
		</Product.Container>
	)
}
Product.propTypes = {
	product: PropTypes.object.isRequired,
	onAddToCart: PropTypes.func.isRequired,
	renderProductDetails: PropTypes.func.isRequired
}
export default Product

Product.Container = styled.div`
	width: 220px;
	height: 336px;
	margin-bottom: 25px;
	background-color: white;
	border-radius: 10px;
	:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		border: 1px solid #e9e9e9;
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
text-align: center;
> :nth-child(2) {
	margin-bottom: 10px
}
`
Product.StyledCta = styled(Cta)`
	width: auto;
	margin-top: 16px;
`
