import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { fetchProducts, fetchProductsInCategory } from '../../actionCreators/products'
import { fetchCategory } from '../../actionCreators/categories'
import { selectDepartmentCategories } from '../../selectors'
import ColorPicker from '../../ui/colorPicker'
import SizePicker from '../../ui/sizePicker'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedColor: ''
		}
	}

	componentDidMount() {
		console.log(this.props)
	}

	onCategorySelect = (categoryId) => {
		const { dispatchFetchCategory, dispatchFetchProductsInCategory } = this.props
		dispatchFetchProductsInCategory(categoryId)
		dispatchFetchCategory(categoryId)
	}

renderCategories = (categories) => {
	const { selectedCategory } = this.props
	console.log('selectedCategory==========>>>', selectedCategory)
	return (
		categories.length && categories.map(category => (
			<Category
				key={category.name}
				isActive={category.category_id === selectedCategory.category_id}
				onClick={() => this.onCategorySelect(category.category_id)}
			>
				{category.name}
			</Category>
		))
	)
}

render() {
	const {
		allAttributes, attributeValues, allDepartments, allCategories, routeParams, departmentCategories
	} = this.props
	return (
		<Sidebar.Container>
			<div>
				<Sidebar.Attr>Color</Sidebar.Attr>
				<Sidebar.ColorAttr>
					{attributeValues.Color && attributeValues.Color.values.map(values => (
						<ColorPicker
							key={values.value}
							color={values.value}
						/>
					))}
				</Sidebar.ColorAttr>
			</div>
			<div>
				<Sidebar.Attr>Size</Sidebar.Attr>
				<Sidebar.ColorAttr>
					{attributeValues.Size && attributeValues.Size.values.map(values => (
						<SizePicker
							key={values.attribute_value_id}
							size={values.value}
						/>
					))}
				</Sidebar.ColorAttr>
			</div>
			<div>Categories</div>
			{routeParams.department_id
				? this.renderCategories(departmentCategories)
				: this.renderCategories(allCategories)
			}
		</Sidebar.Container>
	)
}
}

function mapStateToProps(state, ownProps) {
	let departmentCategories = []
	let departmentName = ''
	if (ownProps.routeParams.department_id) {
		departmentCategories = selectDepartmentCategories(state, ownProps.routeParams.department_id)
		departmentName = ownProps.routeParams.department_name
	}
	return {
		products: state.products.allProducts,
		allAttributes: state.attributes.allAttributes,
		attributeValues: state.attributes.attributeValues,
		departments: state.departments.allDepartments,
		allCategories: state.categories.allCategories,
		departmentCategories: departmentCategories || [],
		departmentName,
		selectedCategory: state.categories.selectedCategory
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch),
	dispatchFetchProductsInCategory: bindActionCreators(fetchProductsInCategory, dispatch),
	dispatchFetchCategory: bindActionCreators(fetchCategory, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

Sidebar.Container = styled.div`
  width: 200px;
  height: 700px;
  background-color: white;
  overflow-y: scroll;
	padding: 15px;
	color: #4A4A4A;
`

Sidebar.ColorAttr = styled.ul`
	display: flex;
	flex-wrap: wrap;
	padding-left: inherit;
`
Sidebar.Attr = styled.div`
	font-weight: bold;
`
const Category = styled.div`
  margin: 10px;
	background-color: ${({ isActive }) => isActive && '#F62F5E'};
  padding: 10px 0;
  text-align: center;
	font-weight: bold;
	color: ${({ isActive }) => isActive && '#FFF'};

`
