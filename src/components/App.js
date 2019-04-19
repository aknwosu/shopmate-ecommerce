import React, { Component } from 'react';
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
	children: PropTypes.object
}
export default App;
