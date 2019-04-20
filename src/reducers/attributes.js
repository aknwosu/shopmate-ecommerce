const initialState = {
	allAttributes: [],
	attributesCount: 0,
	attributeValues: {}
};
export default function attributesReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_ATTRIBUTES_SUCCESS': {
		return Object.assign({}, state, {
			allAttributes: action.payload,
			// attributesCount: action.payload.count
		});
	}
	case 'FETCH_ATTRIBUTE_VALUE_SUCCESS': {
		return {
			...state,
			attributeValues: {
				...state.attributeValues,
				[action.payload.attributeName]: action.payload
			}
		};
	}

	default: return state;
	}
}
