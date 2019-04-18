const initialState = {
	allDepartments: {}
};
export default function departmentsReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_DEPARTMENTS_SUCCESS': {
		return Object.assign({}, state, {
			allDepartments: action.payload
		});
	}
	default:
		return state;
	}
}
