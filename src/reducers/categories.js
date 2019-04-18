const initialState = {
	allCategories: {},
	selectedCategory: {},
	productCategories: [],
	departmentCategories: {}
};
export default function categoriesReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_CATEGORIES_SUCCESS': {
		return Object.assign({}, state, {
			categories: action.payload.categories
		});
	}
	case 'FETCH_CATEGORY_SUCCESS': {
		return Object.assign({}, state, {
			selectedCategory: action.payload.category
		});
	}
	case 'FETCH_PRODUCT_CATEGORIES_SUCCESS': {
		return Object.assign({}, state, {
			productCategories: action.payload.categories
		});
	}
	case 'FETCH_DEPARTMENT_CATEGORIES_SUCCESS': {
		return {
			...state,
			departmentCategories: {
				...state.departmentCategories,
				[action.payload.department_id]: action.payload.departments
			}
		}
	}
	default: return state;
	}
}
