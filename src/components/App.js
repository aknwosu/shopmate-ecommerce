import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Header from './Header'
import TopBar from './TopBar'

class App extends Component {
	render() {
		const { children } = this.props
		return (
			<div>
				<TopBar />
				{children}
			</div>
		);
	}
}
App.propTypes = {
	children: PropTypes.node
}
export default App;
