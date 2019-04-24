const initialState = {
	order: {},
	orderID: ''
};
export default function orderReducer(state = initialState, action) {
	switch (action.type) {
	case 'CREATE_ORDER_SUCCESS': {
		return {
			...state,
			orderID: action.payload.orderId
		}
	}
	case 'FETCH_ORDER_SUCCESS': {
		return {
			...state,
			order: action.payload
		}
	}
	default: return state;
	}
}
