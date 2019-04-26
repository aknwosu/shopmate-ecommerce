const initialState = {
	user: {},
	address: {}
}
export default function customersReducer(state = initialState, action) {
	switch (action.type) {
	case 'LOGIN_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload.customer
		})
	}
	case 'FETCH_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload
		})
	}
	case 'REGISTER_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload.customer
		})
	}
	case 'UPDATE_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload
		})
	}

	default: return state
	}
}
