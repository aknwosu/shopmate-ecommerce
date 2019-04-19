const initialState = {
	allProducts: {}
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_PRODUCTS_SUCCESS': {
		return Object.assign({}, state, {
			allProducts: action.payload.rows
		});
	}
	case 'SEARCH_PRODUCTS_SUCCESS': {
		console.log(action.payload)
		return {
			...state,
			allProducts: action.payload.rows
		}
	}
	default: return state;
	}
}
