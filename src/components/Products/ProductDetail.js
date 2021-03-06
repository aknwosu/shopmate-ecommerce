import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Rating from 'react-rating'
import StarEmpty from '../../ui/star_empty';
import Star from '../../ui/star';
import ColorPicker from '../../ui/colorPicker'
import SizePicker from '../../ui/sizePicker'
import AddSubtractCta from '../../ui/number-input'
import Cta from '../../ui/CTABtn'
import { ErrorText } from '../../ui/Typography'
import { fetchProductAttributes } from '../../actionCreators/attributes'

import { fetchProductDetail, fetchProductReviews } from '../../actionCreators/products'
import { addToCart } from '../../actionCreators/cart'

export class ProductDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedSize: '',
			selectedColor: '',
			quantity: 1,
			errors: ''
		}
	}

	componentDidUpdate() {
		const {
			productDetail, dispatchFetchProductDetail, dispatchFetchProductAttributes, dispatchFetchProductReviews, match: { params }
		} = this.props
		if (!productDetail.product_id) {
			dispatchFetchProductDetail(params.product_id)
			dispatchFetchProductReviews(params.product_id)
			dispatchFetchProductAttributes(params.product_id)
		}
	}

	selectAttr = (name, value) => {
		this.setState({ [name]: value, errors: '' })
	}

	onChangeQuantity = (value) => {
		if (value < 0) {
			return
		}
		this.setState({ quantity: value, errors: '' })
	}

	addToCart = () => {
		const {
			selectedColor, selectedSize, quantity, errors
		} = this.state
		if (!selectedColor || !selectedSize || quantity < 1) {
			this.setState({ errors: 'Please select attributes for your selected' })
			return
		}
		const {
			dispatchAddToCart, productDetail: {
				name, product_id, price, image, discounted_price
			}
		} = this.props
		const cartItem = {
			product_id,
			name,
			quantity,
			actualPrice: Number(discounted_price) > 0 ? Number(discounted_price) : price,
			price: Number(discounted_price) > 0 ? Number(discounted_price) * quantity : Number(price) * quantity,
			color: selectedColor,
			size: selectedSize,
			image
		}
		dispatchAddToCart(cartItem)
	}

	renderProductDetails = () => {
		const { REACT_APP_IMAGE_URL } = process.env
		const {
			selectedSize, selectedColor, errors, quantity
		} = this.state
		const {
			attributesInProduct,
			productRating,
			productDetail: {
				image, image_2, thumbnail, name, price, discounted_price, description
			}
		} = this.props
		const productColors = attributesInProduct && attributesInProduct.filter(attribute => attribute.attribute_name === 'Color')
		const productSizes = attributesInProduct && attributesInProduct.filter(attribute => attribute.attribute_name === 'Size')

		return (
			<ProductDetail.Container>
				<ProductDetail.ImageWrapper>
					<ProductDetail.Image src={`${REACT_APP_IMAGE_URL}${image}`} alt={image} />
					<ProductDetail.AltImages>
						<ProductDetail.Icons src={`${REACT_APP_IMAGE_URL}${image_2}`} alt={image_2} />
						<ProductDetail.Icons src={`${REACT_APP_IMAGE_URL}${thumbnail}`} alt={thumbnail} />

					</ProductDetail.AltImages>
					<p>{description}</p>

				</ProductDetail.ImageWrapper>
				<ProductDetail.Info>
					<ProductDetail.SyledRating
						// eslint-disable-next-line react/no-unknown-property
						readonly
						initialRating={Number(productRating)}
						emptySymbol={<StarEmpty />}
						fullSymbol={<Star />}
					/>
					<div>{name}</div>
					<div>
						<div>$ {Number(discounted_price) > 0 ? discounted_price : price}</div>
						{ Number(discounted_price) > 0 && <ProductDetail.OldPrice>${price}</ProductDetail.OldPrice>}
					</div>
					<ProductDetail.Attr>
						<div>Color</div>
						<div>
							{productColors && productColors.map(attr => (
								<ColorPicker
									key={attr.attribute_value}
									color={attr.attribute_value}
									active={selectedColor === attr.attribute_value}
									onClick={() => this.selectAttr('selectedColor', attr.attribute_value)}
								/>
							))}
						</div>
					</ProductDetail.Attr>
					<ProductDetail.Attr>
						<div>Size</div>
						<div>
							{productSizes && productSizes.map(attr => (
								<SizePicker
									key={attr.attribute_value}
									size={attr.attribute_value}
									active={selectedSize === attr.attribute_value}
									onClick={() => this.selectAttr('selectedSize', attr.attribute_value)}
								/>
							))}
						</div>
					</ProductDetail.Attr>
					<ProductDetail.Add>
						<AddSubtractCta
							value={quantity}
							onChange={(value) => { this.onChangeQuantity(value) }}
						/>
					</ProductDetail.Add>
					{errors && <ErrorText>{errors}</ErrorText>}
					<Cta onClick={this.addToCart}>Add to cart</Cta>
				</ProductDetail.Info>

			</ProductDetail.Container>
		)
	}

	render() {
		const { productDetail } = this.props
		return (
			<div>
				{productDetail && this.renderProductDetails()}
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		cartItems: state.cart.cartItems,
		products: state.products.allProducts,
		productDetail: state.products.productDetail,
		attributeValues: state.attributes.attributeValues,
		attributesInProduct: state.attributes.attributesInProduct,
		productRating: state.products.productRating,
	}
}
const mapDispatchToProps = dispatch => ({
	// dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchFetchProductDetail: bindActionCreators(fetchProductDetail, dispatch),
	dispatchFetchProductReviews: bindActionCreators(fetchProductReviews, dispatch),
	dispatchFetchProductAttributes: bindActionCreators(fetchProductAttributes, dispatch),
})

ProductDetail.propTypes = {
	productDetail: PropTypes.object.isRequired,
	dispatchAddToCart: PropTypes.func.isRequired,
	dispatchFetchProductDetail: PropTypes.func.isRequired,
	dispatchFetchProductAttributes: PropTypes.func.isRequired,
	dispatchFetchProductReviews: PropTypes.func.isRequired,
	attributesInProduct: PropTypes.array.isRequired,
	productRating: PropTypes.string.isRequired,
	match: PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)

ProductDetail.Container = styled.div`
	display: flex;
	background-color: white;
	margin: 0 auto;
	width: 940px;
	height: 620px;
	margin-top: 30px;
	@media screen and (max-width: 425px) {
		margin-top: 15px;
		width: 100%;
		flex-direction: column;
		height: unset;
	}
`
ProductDetail.ImageWrapper = styled.div`
	width: 400px;
	padding: 50px;
	@media screen and (max-width: 425px) {
		padding: 20px 15px;
		flex-direction: column;
		height: unset;
		width: unset;
	}
`
ProductDetail.Image = styled.img`
	width: 250px;
	height: 270px;
  @media screen and (max-width: 425px) {
	  display: block;
    margin-left: auto;
    margin-right: auto;
  }
`
ProductDetail.AltImages = styled.div`
	display: flex;
	margin-top: 20px;
	@media screen and (max-width: 425px) {
		justify-content: center;
	}
`
ProductDetail.Icons = styled.img`
	max-width: 40px;
	max-height: 45px;
	display: inline-block;
	margin-right: 20px;
	:hover {
    max-width: 70px;
		max-height: 80px;
  }

`
ProductDetail.Info = styled.div`
 flex: 1;
 > :nth-child(2) {
		font-size: 12px;
		color: #F62F5E;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 25px;
		flex-wrap: wrap;
	}
	> :nth-child(3) {
		font-size: 12px;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 25px;
	}
	@media screen and (max-width: 425px) {
		padding: 10px;
		text-align: center;
		display: block;
    margin: auto;
  }
`
ProductDetail.SyledRating = styled(Rating)`
	margin: 20px 0;
`

ProductDetail.Attr = styled.div`
  margin-top: 15px;
	margin-bottom: 20px;
  > :nth-child(1) {
    color: #b4b4b4;
    font-weight: bold;
  }
  > :nth-child(2) {
    display: flex;
  }
`
ProductDetail.Add = styled.div`
	display: flex;
	margin: 20px auto;
	justify-content: left;
	@media screen and (max-width: 425px) {
		justify-content: center;
	}
`
ProductDetail.OldPrice = styled.div`
	color: #F62F5E;
	font-style: italic;
	font-size: 16px;
	text-decoration: line-through;
`
