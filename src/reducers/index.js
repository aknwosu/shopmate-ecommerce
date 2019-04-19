import { combineReducers } from 'redux'
import customers from './customers'
import departments from './departments'
import products from './products'

export default combineReducers({
	customers,
	departments,
	products
})
