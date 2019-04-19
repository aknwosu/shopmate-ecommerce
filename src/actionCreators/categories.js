import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env

const headers = {
	'Content-Type': 'application/json',
	// eslint-disable-next-line no-undef
	accessToken: localStorage.getItem('accessToken'),
};

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR';

export const FETCH_PRODUCT_CATEGORIES_REQUEST = 'FETCH_PRODUCT_CATEGORIES_REQUEST';
export const FETCH_PRODUCT_CATEGORIES_SUCCESS = 'FETCH_PRODUCT_CATEGORIES_SUCCESS';
export const FETCH_PRODUCT_CATEGORIES_ERROR = 'FETCH_PRODUCT_CATEGORIES_ERROR';

export const FETCH_DEPARTMENT_CATEGORIES_REQUEST = 'FETCH_DEPARTMENT_CATEGORIES_REQUEST';
export const FETCH_DEPARTMENT_CATEGORIES_SUCCESS = 'FETCH_DEPARTMENT_CATEGORIES_SUCCESS';
export const FETCH_DEPARTMENT_CATEGORIES_ERROR = 'FETCH_DEPARTMENT_CATEGORIES_ERROR';

export const fetchCategories = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_CATEGORIES_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/categories`, {
			headers,
		});
		dispatch({
			type: FETCH_CATEGORIES_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_CATEGORIES_ERROR, payload: error, error: true });
	}
};

export const fetchCategory = id => async (dispatch) => {
	try {
		dispatch({ type: FETCH_CATEGORY_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/categories/${id}`, {
			headers,
		});
		dispatch({
			type: FETCH_CATEGORY_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_CATEGORY_ERROR, payload: error, error: true });
	}
};

export const fetchProductCategories = productId => async (dispatch) => {
	try {
		dispatch({ type: FETCH_PRODUCT_CATEGORIES_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/categories/inProduct/${productId}`, {
			headers,
		});
		dispatch({
			type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_PRODUCT_CATEGORIES_ERROR, payload: error, error: true });
	}
};

export const fetchDepartmentCategories = departmentId => async (dispatch) => {
	try {
		dispatch({ type: FETCH_DEPARTMENT_CATEGORIES_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/categories/inDepartment/${departmentId}`, {
			headers,
		});
		const payload = { ...request.data, department_id: departmentId };
		dispatch({
			type: FETCH_DEPARTMENT_CATEGORIES_SUCCESS,
			payload,
		});
	} catch (error) {
		dispatch({ type: FETCH_DEPARTMENT_CATEGORIES_ERROR, payload: error, error: true });
	}
};
