import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { fetchProducts } from '../../actionCreators/products'
import ColorPicker from '../../ui/colorPicker'
import SizePicker from '../../ui/sizePicker'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedColor: ''
		}
	}

	render() {
		const { allAttributes, attributeValues } = this.props

		return (
			<Sidebar.Container>
				<div>
					<Sidebar.Attr>Color</Sidebar.Attr>
					<Sidebar.ColorAttr>
						{attributeValues.Color && attributeValues.Color.values.map(values => (
							<ColorPicker
								color={values.value}
							/>
						))}
					</Sidebar.ColorAttr>
				</div>
				<div>
					<Sidebar.Attr>Size</Sidebar.Attr>
					<Sidebar.ColorAttr>
						{attributeValues.Size && attributeValues.Size.values.map(values => (
							<SizePicker size={values.value} />
						))}
					</Sidebar.ColorAttr>
				</div>
			</Sidebar.Container>
		)
	}
}

function mapStateToProps(state) {
	return {
		products: state.products.allProducts,
		allAttributes: state.attributes.allAttributes,
		attributeValues: state.attributes.attributeValues
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
