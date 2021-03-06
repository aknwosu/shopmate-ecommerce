import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { fetchCustomer, login } from '../actionCreators/customers'
import { fetchDepartmentCategories } from '../actionCreators/categories'
import { fetchDepartments } from '../actionCreators/departments'
import { fetchProducts, searchProducts, fetchProductsInDepartment } from '../actionCreators/products'
import { getCurrentUser } from '../selectors'
import Logo from '../assets/logo.svg'
import SearchIcon from '../assets/search_icon_white.svg'
import ModalManager from './ModalManager'
import CartUI from '../ui/cartUI'

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: '',
			visibleModal: null
		}
	}

	// eslint-disable-next-line consistent-return
	componentDidMount() {
		const {
			dispatchFetchDepartments, dispatchFetchProductsInDepartment, dispatchFetchProducts, match: { params }
		} = this.props
		dispatchFetchDepartments();
		if (params.department_id) {
			return dispatchFetchProductsInDepartment(params.department_id, params.department_id)
		}
		dispatchFetchProducts()
	}

	productsHome = () => {
		const { dispatchFetchProducts, push } = this.props
		dispatchFetchProducts()
		push('/products')
	}

	getDepartmentData = (dept) => {
		const { dispatchFetchProductsInDepartment, dispatchFetchDepartmentCategories, push } = this.props
		const { name, department_id } = dept
		dispatchFetchProductsInDepartment(department_id)
		dispatchFetchDepartmentCategories(department_id)
		push(`/products/department/${name}/${department_id}`)
	}

	renderDepartments = () => {
		const { departments, location, match: { params } } = this.props
		return Object.keys(departments).map((data, i) => {
			const department = departments[data]
			return (
				<Header.Dept
					key={department.name}
					className="department"
					isActive={location.pathname.includes(department.name)}
					onClick={() => {
						this.getDepartmentData(department);
					}}
				>
					{department.name}
				</Header.Dept>
			);
		})
	}

	onSearchTextChange = (e) => {
		this.setState({ searchText: e.target.value })
	}

	clearSearchText = () => {
		this.setState({ searchText: '' })
	}

	search = () => {
		const { searchText } = this.state;
		const { dispatchSearchProducts } = this.props
		if (searchText) {
			dispatchSearchProducts(searchText)
		}
	}

	onKeyPress = ({ key }) => {
		if (key === 'Enter') {
			this.search()
		}
	}

	render() {
		const { push, location, cart: { cartItems } } = this.props
		const { searchText, visibleModal } = this.state
		return (
			<Header.Container>
				<Header.Links>
					<Header.Logo
						src={Logo}
						alt="shopmate"
						onClick={this.productsHome}
					/>
					<Header.Actions>
						<Header.Departments>
							{this.renderDepartments()}
						</Header.Departments>
						<Header.Search
							display={location.pathname !== '/products' && 'none'}
						>
							<Header.CTASearch onClick={this.search} />
							<Header.SearchInput
								autoFocus
								placeholder="search anything"
								onChange={e => this.onSearchTextChange(e)}
								value={searchText}
								onSubmit={this.search}
								onKeyPress={this.onKeyPress}
							/>
							<span onClick={this.clearSearchText}>x</span>
						</Header.Search>
						<CartUI
							onClick={() => this.setState({ visibleModal: 'checkout' })}
							count={cartItems.length}
						/>
					</Header.Actions>
				</Header.Links>
				{visibleModal !== null && (
					<ModalManager
						visibleModal={visibleModal}
						isOpen={!!visibleModal}
						closeModal={() => this.setState({ visibleModal: null })}
						push={push}
					/>
				)}
			</Header.Container>
		)
	}
}
Header.propTypes = {
	cart: PropTypes.object.isRequired,
	dispatchSearchProducts: PropTypes.func.isRequired,
	dispatchFetchDepartments: PropTypes.func.isRequired,
	dispatchFetchProducts: PropTypes.func.isRequired,
	departments: PropTypes.array.isRequired,
	push: PropTypes.func.isRequired,
	dispatchFetchProductsInDepartment: PropTypes.func.isRequired,
	dispatchFetchDepartmentCategories: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
}
function mapStateToProps(state, ownProps) {
	return {
		cart: state.cart,
		currentUser: getCurrentUser(state),
		departments: state.departments.allDepartments,
		products: state.products.allProducts,
		push: ownProps.history.push,

	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchCustomer: bindActionCreators(fetchCustomer, dispatch),
	dispatchLogin: bindActionCreators(login, dispatch),
	dispatchFetchDepartments: bindActionCreators(fetchDepartments, dispatch),
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchSearchProducts: bindActionCreators(searchProducts, dispatch),
	dispatchFetchProductsInDepartment: bindActionCreators(fetchProductsInDepartment, dispatch),
	dispatchFetchDepartmentCategories: bindActionCreators(fetchDepartmentCategories, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

Header.Logo = styled.img`
	cursor: pointer;
`

Header.Container = styled.div`
	background-color: #2E2E2E;
	min-width: 960px;
	@media screen and (max-width: 425px) {
		width: 100vw;
		min-width: 100%;
	}
`
Header.Links = styled.div`
  max-width: 960px;
	margin: auto;
	height: 72px;
	display: flex;
	padding: 0 30px;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 425px) {
		width: 93%;
		padding: 10px 10px;
		flex-direction: column;
		height: unset;
	}
`
Header.Departments = styled.div`
	color: white;
	display: flex;
`
Header.SearchInput = styled.input`
	border-radius: 18px;
	padding: 7px 10px;
	font-size: 14px;
	background-color: #9c9a9a;
  color: white;
	width: 210px;
  padding-left: 40px;
	@media screen and (max-width: 425px) {
		width: 180px;
	}

`
Header.Cart = styled.div`
	position: relative;
  bottom: 0;
	width: 29px;
	@media screen and (max-width: 425px) {
	display: none;
	}
`
Header.ItemsCount = styled.div`
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
Header.Search = styled.div`
	color: white;
	position: relative;
	width: 260px;
	display: ${({ display }) => display && display};
	> span {
		position: absolute;
    right: 10px;
		top: 7px;
	}
	@media screen and (max-width: 425px) {
		width: 230px
	}
`
Header.CTASearch = styled.div`
	background: url(${SearchIcon});
	width: 15px;
	height: 20px;
	background-repeat: no-repeat;
	position: absolute;
	left: 15px;
	top: 10px;
`

Header.Dept = styled.div`
	color:  ${({ isActive }) => (isActive ? '#F62F5E' : 'white')};
	font-weight: ${({ isActive }) => isActive && 'bold'};
	cursor: pointer;
	margin: auto 20px;
	:hover{
		text-decoration: underline;
	}
	@media screen and (max-width: 425px) {
		margin: 10px 20px;
	}
`
Header.Actions = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: 425px) {
		flex-wrap: wrap;
	}
`
