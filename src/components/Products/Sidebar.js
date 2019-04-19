import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { fetchProducts } from '../../actionCreators/products'

class Sidebar extends Component {
	render() {
		return (
			<Sidebar.Container>Sidebar</Sidebar.Container>
		)
	}
}

function mapStateToProps(state) {
	console.log('mapStateToProps====', state)
	return {
		// currentUser: getCurrentUser(state),
		products: state.products.allProducts
	}
}
const mapDispatchToProps = dispatch => ({
	dispatchFetchProducts: bindActionCreators(fetchProducts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

Sidebar.Container = styled.div`
  width: 220px;
  height: 700px;
  background-color: rebeccapurple;
  overflow-y: scroll;
`
