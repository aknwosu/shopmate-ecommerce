import React, { Component } from 'react';
import Header from './Header'
import TopBar from './TopBar'

class App extends Component {
	render() {
		return (
			<div>
				<TopBar />
				<Header />
			</div>
		);
	}
}

export default App;
