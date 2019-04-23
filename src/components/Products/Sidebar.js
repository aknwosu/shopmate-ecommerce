import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { fetchProducts } from '../../actionCreators/products'
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

renderCategories = categories => (
	categories.length && categories.map(category => (
		<div key={category.name}>
			{category.name}
		</div>
	))
)

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
			{routeParams.department_id
				? this.renderCategories(departmentCategories)
				: this.renderCategories(allCategories)
			}
		</Sidebar.Container>
	)
}
}

function mapStateToProps(state, ownProps) {
	console.log('sidebar own props====', ownProps)
	let departmentCategories = []
	if (ownProps.routeParams.department_id) {
		departmentCategories = selectDepartmentCategories(state, ownProps.routeParams.department_id)
		// state.categories.departmentCategories[ownProps.routeParams.department_id]
	}
	return {
		products: state.products.allProducts,
		allAttributes: state.attributes.allAttributes,
		attributeValues: state.attributes.attributeValues,
		departments: state.departments.allDepartments,
		allCategories: state.categories.allCategories,
		departmentCategories: departmentCategories || []
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch)
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
