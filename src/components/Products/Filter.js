import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { fetchProducts, fetchProductsInCategory } from '../../actionCreators/products'
import { fetchCategory } from '../../actionCreators/categories'
import { selectDepartmentCategories } from '../../selectors'
import ColorPicker from '../../ui/colorPicker'
import SizePicker from '../../ui/sizePicker'

class Filter extends Component {
	onCategorySelect = (categoryId) => {
		const { dispatchFetchCategory, dispatchFetchProductsInCategory } = this.props
		dispatchFetchProductsInCategory(categoryId)
		dispatchFetchCategory(categoryId)
	}

renderCategories = (categories) => {
	const { selectedCategory } = this.props
	return (
		categories.map(category => (
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
		allAttributes, attributeValues, allCategories, routeParams, departmentCategories
	} = this.props
	return (
		<Filter.Container>
			<div>
				<Filter.Attr>Color</Filter.Attr>
				<Filter.ColorAttr>
					{attributeValues.Color && attributeValues.Color.values.map(values => (
						<ColorPicker
							key={values.value}
							color={values.value}
						/>
					))}
				</Filter.ColorAttr>
			</div>
			<div>
				<Filter.Attr>Size</Filter.Attr>
				<Filter.ColorAttr>
					{attributeValues.Size && attributeValues.Size.values.map(values => (
						<SizePicker
							key={values.attribute_value_id}
							size={values.value}
						/>
					))}
				</Filter.ColorAttr>
			</div>
			<Filter.Title>Categories</Filter.Title>
			{routeParams.department_id
				? this.renderCategories(departmentCategories)
				: this.renderCategories(allCategories)
			}
		</Filter.Container>
	)
}
}

Filter.propTypes = {
	dispatchFetchCategory: PropTypes.func.isRequired,
	dispatchFetchProductsInCategory: PropTypes.func.isRequired,
	departmentCategories: PropTypes.array.isRequired,
	selectedCategory: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter)

Filter.Container = styled.div`
  width: 200px;
  height: 700px;
  background-color: white;
  overflow-y: scroll;
	padding: 15px;
	color: #4A4A4A;
`

Filter.ColorAttr = styled.ul`
	display: flex;
	flex-wrap: wrap;
	padding-left: inherit;
`
Filter.Attr = styled.div`
	font-weight: bold;
`
const Category = styled.div`
  margin: 10px;
	background-color: ${({ isActive }) => isActive && '#F62F5E'};
  padding: 10px 0;
  text-align: center;
	font-weight: ${({ isActive }) => (isActive ? 'bold' : '400')};;
	color: ${({ isActive }) => isActive && '#FFF'};
	cursor: pointer;
`
Filter.Title = styled.div`
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid;
  padding-bottom: 11px;
  margin-top: 30px;
`;
