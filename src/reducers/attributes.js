const initialState = {
	allAttributes: [],
	attributesCount: 0,
	attribute: {}
};
export default function categoriesReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_ATTRIBUTES_SUCCESS': {
		return Object.assign({}, state, {
			allAttributes: action.payload.rows,
			attributesCount: action.payload.count
		});
	}
	case 'FETCH_ATTRIBUTE_VALUE_SUCCESS': {
		return {
			...state,
			attribute: {
				...state.attribute,
				[action.payload.attributeName]: action.payload
			}
		};
	}

	default: return state;
	}
}
