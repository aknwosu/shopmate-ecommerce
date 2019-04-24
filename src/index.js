import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './theme/globalStyle'
import App from './components/App';
import Home from './components/Home'
import Products from './components/Products'
import ProductDetail from './components/Products/ProductDetail'
import Checkout from './components/Checkout'
import UpdateProfile from './components/UpdateAddress'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<GlobalStyle />
			<App>
				<Route path="/" exact component={Home} />
				<Route path="/products" exact component={Products} />
				<Route path="/products/:product_id" exact component={ProductDetail} />
				<Route path="/products/department/:department_name/:department_id" component={Products} />
				<Route path="/checkout" exact component={Checkout} />
				<Route path="/updateAddress" exact component={UpdateProfile} />
			</App>
		</BrowserRouter>
	</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
