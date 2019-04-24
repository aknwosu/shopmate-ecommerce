const initialState = {
	shippingRegions: [],
	shippingForRegion: [],
	shippingType: {},
	tax: []
}

export default function shippingReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_ALL_SHIPPING_REGIONS_SUCCESS': {
		return {
			...state,
			shippingRegions: action.payload
		}
	}

	case 'FETCH_SHIPPING_FOR_REGION_SUCCESS': {
		return {
			...state,
			shippingForRegion: action.payload
		}
	}
	case 'UPDATE_SHIPPING_TYPE': {
		return {
			...state,
			shippingType: action.payload
		}
	}
	case 'GET_TAX_SUCCESS': {
		return {
			...state,
			tax: action.payload
		}
	}
	default: return state;
	}
}
