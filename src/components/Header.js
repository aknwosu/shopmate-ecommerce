import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { fetchCustomer, login } from '../actionCreators/customers'
import { fetchDepartments } from '../actionCreators/departments'
import { fetchProducts, searchProducts } from '../actionCreators/products'
import { getCurrentUser } from '../selectors'
import Logo from '../assets/logo.svg'
import SearchIcon from '../assets/search_icon_white.svg'
import Cta from '../ui/CTABtn'
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

	componentDidMount() {
		const { dispatchFetchDepartments, dispatchFetchProducts } = this.props
		dispatchFetchDepartments();
		dispatchFetchProducts()
	}

	renderDepartments = () => {
		const { departments } = this.props

		return Object.keys(departments).map((data, i) => {
			const department = departments[data]
			return <div key={department.name} className="department" onClick={() => {}}>{department.name}</div>
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
		const { cart: { cartItems } } = this.props
		const { searchText, visibleModal } = this.state
		return (
			<Header.Container>
				<Header.Logo src={Logo} alt="shopmate" />
				<Header.Departments>
					{this.renderDepartments()}
				</Header.Departments>
				<Header.Search>
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
				<Cta onClick={() => this.setState({ visibleModal: 'checkout' })}>Checkout</Cta>
				<CartUI count={cartItems.length} />
				{visibleModal !== null && (
					<ModalManager
						visibleModal={visibleModal}
						isOpen={!!visibleModal}
						closeModal={() => this.setState({ visibleModal: null })}
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

}
function mapStateToProps(state) {
	return {
		cart: state.cart,
		currentUser: getCurrentUser(state),
		departments: state.departments.allDepartments,
		products: state.products.allProducts
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchCustomer: bindActionCreators(fetchCustomer, dispatch),
	dispatchLogin: bindActionCreators(login, dispatch),
	dispatchFetchDepartments: bindActionCreators(fetchDepartments, dispatch),
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchSearchProducts: bindActionCreators(searchProducts, dispatch),

})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.Logo = styled.img`
	
`
Header.Container = styled.div`
	background-color: #2E2E2E;
	height: 72px;
	display: flex;
	padding: 0 30px;
	align-items: center;
	justify-content: space-between;
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
`
Header.Cart = styled.div`
	position: relative;
  bottom: 0;
	width: 29px;
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
	> span {
		position: absolute;
    right: 10px;
		top: 7px;
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
