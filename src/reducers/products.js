const initialState = {
	allProducts: {},
	productDetail: {},
	productReviews: [],
	productRating: 0
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_PRODUCTS_SUCCESS': {
		return Object.assign({}, state, {
			allProducts: action.payload.rows
		});
	}
	case 'SEARCH_PRODUCTS_SUCCESS': {
		return {
			...state,
			allProducts: action.payload.rows
		}
	}
	case 'FETCH_PRODUCT_DETAIL_SUCCESS': {
		return {
			...state,
			productDetail: action.payload
		}
	}

	case 'FETCH_PRODUCT_REVIEWS_SUCCESS': {
		let totalReviews = 0
		action.payload.map(review => totalReviews += review.rating)
		totalReviews /= (action.payload.length)
		return {
			...state,
			productReviews: action.payload,
			productRating: totalReviews.toFixed(2)
		}
	}
	default: return state;
	}
}
