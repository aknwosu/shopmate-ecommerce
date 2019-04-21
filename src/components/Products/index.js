import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Header from '../Header'
import { fetchProducts, fetchProductDetail } from '../../actionCreators/products'
import { addToCart } from '../../actionCreators/cart'
import Sidebar from './Sidebar';
import Product from './Product'

class Products extends Component {
	renderProductDetails = (id) => {
		this.props.dispatchFetchProductDetail(id)
		this.props.history.push(`/products/${id}`)
	}

	render() {
		const { products, dispatchAddToCart, productDetail } = this.props
		return (
			<Fragment>
				<Header />
				<Products.Container>
					<Products.Wrapper>
						<Sidebar />
						<Products.List>
							{products && Object.keys(products).map(product => (
								<Product
									key={products[product].id}
									product={products[product]}
									onAddToCart={dispatchAddToCart}
									renderProductDetails={this.renderProductDetails}
									productDetail={productDetail}
								/>
							))}
						</Products.List>
					</Products.Wrapper>
				</Products.Container>
			</Fragment>
		)
	}
}
function mapStateToProps(state) {
	return {
		// currentUser: getCurrentUser(state),
		cartItems: state.cart.cartItems,
		products: state.products.allProducts,
		productDetail: state.products.productDetail
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchFetchProductDetail: bindActionCreators(fetchProductDetail, dispatch),
})

Products.propTypes = {
	products: PropTypes.array.isRequired
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products))

Products.Container = styled.div`
	display: flex;
	width: 940px;
  margin: 0 auto;
`

Products.Wrapper = styled.div`
display: flex;
margin-top: 20px;
`
Products.List = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow: hidden;
	flex: 1;
	margin-left: 20px;
`
