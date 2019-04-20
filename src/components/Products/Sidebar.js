import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { fetchProducts } from '../../actionCreators/products'

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
							<Sidebar.ColorPicker
								color={values.value}
							/>
							// </Sidebar.ColorPicker>
						))}
					</Sidebar.ColorAttr>
				</div>
				<div>
					<Sidebar.Attr>Size</Sidebar.Attr>
					<Sidebar.ColorAttr>
						{attributeValues.Size && attributeValues.Size.values.map(values => (
							<Sidebar.SizePicker>
								{values.value}
							</Sidebar.SizePicker>
						))}
					</Sidebar.ColorAttr>
				</div>
			</Sidebar.Container>
		)
	}
}

function mapStateToProps(state) {
	console.log('mapStateToProps====', state)
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
Sidebar.ColorPicker = styled.li`
	background-color: ${({ color }) => color};
	height: 25px;
	width: 25px;
	border-radius: 5px;
	border: 0.5px solid #e9e9e9;
	list-style: none;
	margin: 7px;
	:hover {
		box-shadow: 0 14px 8px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}
`
Sidebar.ColorAttr = styled.ul`
	display: flex;
	flex-wrap: wrap;
	padding-left: inherit;
`
Sidebar.Attr = styled.div`
	font-weight: bold;
`

Sidebar.SizePicker = styled(Sidebar.ColorPicker)`
	width: 40px;
	text-align: center;
	background-color: white;
	height: 27px;
	text-align: center;
	justify-content: center;
	display: flex;
	align-items: center;
`
