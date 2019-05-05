const initialState = {
	user: {},
	address: {},
	registerError: null,
	loginError: null
}
export default function customersReducer(state = initialState, action) {
	switch (action.type) {
	case 'LOGIN_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload.customer,
			loginError: null,
			registerError: null,
		})
	}
	case 'FETCH_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload
		})
	}
	case 'REGISTER_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload.customer,
			registerError: null,
			loginError: null
		})
	}
	case 'UPDATE_USER_SUCCESS': {
		return Object.assign({}, state, {
			user: action.payload
		})
	}
	case 'LOGIN_USER_ERROR': {
		return Object.assign({}, state, {
			loginError: action.payload
		})
	}
	case 'REGISTER_USER_ERROR': {
		return Object.assign({}, state, {
			registerError: action.payload
		})
	}
	default: return state
	}
}
