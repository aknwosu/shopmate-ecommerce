import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Header from '../Header'
import { fetchProducts, fetchProductDetail } from '../../actionCreators/products'
import { addToCart } from '../../actionCreators/cart'
import { fetchProductAttributes } from '../../actionCreators/attributes'
import Sidebar from './Sidebar';
import Product from './Product'
import Pagination from '../Pagination';


class Products extends Component {
	renderProductDetails = (id) => {
		this.props.dispatchFetchProductDetail(id)
		this.props.dispatchFetchProductAttributes(id)
		this.props.history.push(`/products/${id}`)
	}

	onPageChanged = (pageNumber) => {
		const { dispatchFetchProducts } = this.props
		dispatchFetchProducts(pageNumber)
	}

	render() {
		const {
			products, dispatchAddToCart, productDetail, productsCount
		} = this.props
		console.log('product props', this.props)
		return (
			<Fragment>
				<Header />
				<Products.Container>
					<Products.Wrapper>
						<Sidebar />
						<Products.List>
							<Pagination totalCount={productsCount} onPageChanged={this.onPageChanged} />
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
		productsCount: state.products.count,
		productDetail: state.products.productDetail
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchFetchProductDetail: bindActionCreators(fetchProductDetail, dispatch),
	dispatchFetchProductAttributes: bindActionCreators(fetchProductAttributes, dispatch),
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
