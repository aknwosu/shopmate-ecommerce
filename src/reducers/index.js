import { combineReducers } from 'redux'
import customers from './customers'
import departments from './departments'

export default combineReducers({
	customers,
	departments
})
