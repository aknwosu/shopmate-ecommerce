import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {
	fetchProducts, fetchProductDetail, fetchProductsInDepartment, fetchProductsInCategory, fetchProductReviews
} from '../../actionCreators/products'
import { addToCart } from '../../actionCreators/cart'
import { fetchDepartmentCategories } from '../../actionCreators/categories'
import { fetchProductAttributes } from '../../actionCreators/attributes'
import Filter from './Filter';
// eslint-disable-next-line import/no-named-as-default
import Product from './Product'
import Pagination from '../Pagination';
import BurgerIcon from '../../assets/burger-menu.svg'


export class Products extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showFilter: false
		}
	}

	componentDidMount() {
		const { match: { params }, dispatchFetchDepartmentCategories } = this.props
		if (params.department_id) {
			dispatchFetchDepartmentCategories(params.department_id)
		}
	}

	renderProductDetails = (id) => {
		const {
			dispatchFetchProductDetail, dispatchFetchProductAttributes, push, dispatchFetchProductReviews
		} = this.props
		dispatchFetchProductDetail(id)
		dispatchFetchProductAttributes(id)
		dispatchFetchProductReviews(id)
		push(`/products/${id}`)
	}

	showHideFilter = () => {
		this.setState((prevState, props) => ({
			showFilter: !prevState.showFilter
		}))
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
		const { showFilter } = this.state
		return (
			<Fragment>
				<Products.Container>
					<Products.Wrapper>
						<Products.MenuIcon onClick={this.showHideFilter} />
						<Filter routeParams={params} showFilter={showFilter} />
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
function mapStateToProps(state, ownProps) {
	return {
		// currentUser: getCurrentUser(state),
		cartItems: state.cart.cartItems,
		products: state.products.allProducts,
		productsCount: state.products.count,
		productDetail: state.products.productDetail,
		push: ownProps.history.push,
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchAddToCart: bindActionCreators(addToCart, dispatch),
	dispatchFetchProductDetail: bindActionCreators(fetchProductDetail, dispatch),
	dispatchFetchProductAttributes: bindActionCreators(fetchProductAttributes, dispatch),
	dispatchFetchProductsInDepartment: bindActionCreators(fetchProductsInDepartment, dispatch),
	dispatchFetchDepartmentCategories: bindActionCreators(fetchDepartmentCategories, dispatch),
	dispatchFetchProductsInCategory: bindActionCreators(fetchProductsInCategory, dispatch),
	dispatchFetchProductReviews: bindActionCreators(fetchProductReviews, dispatch),
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
	dispatchFetchProducts: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	dispatchFetchProductReviews: PropTypes.func.isRequired
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products))

Products.Container = styled.div`
	display: flex;
	width: 940px;
  margin: 0 auto;
	@media screen and (max-width: 425px) {
		width: 100vw;
	}
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
Products.MenuIcon = styled.div`
	display: none;
	background: url(${BurgerIcon});
	@media screen and (max-width: 425px) {
			display: block;
			height: 30px;
			width: 30px;
			background-size: contain;
		}
`
const ProductsFilter = styled(Filter)`

`
