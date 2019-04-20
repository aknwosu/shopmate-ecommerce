import { combineReducers } from 'redux'
import customers from './customers'
import departments from './departments'
import products from './products'
import cart from './cart'
import attributes from './attributes'
import categories from './categories'

export default combineReducers({
	customers,
	departments,
	products,
	cart,
	attributes,
	categories
})
