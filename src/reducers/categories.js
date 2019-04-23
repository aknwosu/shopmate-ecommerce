const initialState = {
	allCategories: [],
	selectedCategory: {},
	productCategories: [],
	departmentCategories: {}
};
export default function categoriesReducer(state = initialState, action) {
	switch (action.type) {
	case 'FETCH_CATEGORIES_SUCCESS': {
		return Object.assign({}, state, {
			allCategories: action.payload.rows
		});
	}
	case 'FETCH_CATEGORY_SUCCESS': {
		return Object.assign({}, state, {
			selectedCategory: action.payload
		});
	}
	case 'FETCH_PRODUCT_CATEGORIES_SUCCESS': {
		return Object.assign({}, state, {
			productCategories: action.payload.categories
		});
	}
	case 'FETCH_DEPARTMENT_CATEGORIES_SUCCESS': {
		const categoryIds = Object.keys(action.payload).filter(res => res !== ('department_id'))
		const deptCategories = []
		categoryIds.forEach(categoryId => deptCategories.push(action.payload[categoryId]))
		return {
			...state,
			departmentCategories: {
				...state.departmentCategories,
				[action.payload.department_id]: deptCategories
			}
		}
	}
	default: return state;
	}
}
