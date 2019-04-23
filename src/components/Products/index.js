import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Header from '../Header'
import {
	fetchProducts, fetchProductDetail, fetchProductsInDepartment, fetchProductsInCategory
} from '../../actionCreators/products'
import { addToCart } from '../../actionCreators/cart'
import { fetchDepartmentCategories } from '../../actionCreators/categories'
import { fetchProductAttributes } from '../../actionCreators/attributes'
import Filter from './Filter';
import Product from './Product'
import Pagination from '../Pagination';


class Products extends Component {
	componentDidMount() {
		const { match: { params }, dispatchFetchDepartmentCategories } = this.props
		if (params.department_id) {
			dispatchFetchDepartmentCategories(params.department_id)
		}
	}

	renderProductDetails = (id) => {
		const { dispatchFetchProductDetail, dispatchFetchProductAttributes } = this.props
		dispatchFetchProductDetail(id)
		dispatchFetchProductAttributes(id)
		this.props.history.push(`/products/${id}`)
	}

	onPageChanged = (pageNumber) => {
		const { dispatchFetchProducts, dispatchFetchProductsInDepartment, match: { params } } = this.props
		if (params.department_id) {
			return dispatchFetchProductsInDepartment(params.department_id, pageNumber)
		}
		return dispatchFetchProducts(pageNumber)
	}

	render() {
		const {
			products, dispatchAddToCart, productDetail, productsCount, match: { params }
		} = this.props
		console.log('product props', this.props)
		return (
			<Fragment>
				<Header />
				<Products.Container>
					<Products.Wrapper>
						<Filter routeParams={params} />
						<Products.List>
							<Pagination totalCount={productsCount} onPageChanged={this.onPageChanged} />
							{products && Object.keys(products).map(product => (
								<Product
									key={product}
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
		productDetail: state.products.productDetail,
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchFetchProductDetail: bindActionCreators(fetchProductDetail, dispatch),
	dispatchFetchProductAttributes: bindActionCreators(fetchProductAttributes, dispatch),
	dispatchFetchProductsInDepartment: bindActionCreators(fetchProductsInDepartment, dispatch),
	dispatchFetchDepartmentCategories: bindActionCreators(fetchDepartmentCategories, dispatch),
	dispatchFetchProductsInCategory: bindActionCreators(fetchProductsInCategory, dispatch)
})

Products.propTypes = {
	products: PropTypes.array.isRequired,
	dispatchAddToCart: PropTypes.func.isRequired,
	dispatchFetchDepartmentCategories: PropTypes.func.isRequired,
	dispatchFetchProductDetail: PropTypes.func.isRequired,
	dispatchFetchProductAttributes: PropTypes.func.isRequired,
	dispatchFetchProductsInDepartment: PropTypes.func.isRequired,
	productDetail: PropTypes.object,
	match: PropTypes.object,
	productsCount: PropTypes.number.isRequired,
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
