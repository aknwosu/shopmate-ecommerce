import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';

export const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS'
export const FETCH_PRODUCT_DETAIL_ERROR = 'FETCH_PRODUCT_DETAIL_ERROR'

export const FETCH_PRODUCT_REVIEWS_SUCCESS = 'FETCH_PRODUCT_REVIEWS_SUCCESS'
export const FETCH_PRODUCT_REVIEWS_ERROR = 'FETCH_PRODUCT_REVIEWS_ERROR'

export const fetchProducts = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_PRODUCTS_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/products`)
		dispatch({
			type: FETCH_PRODUCTS_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error, error: true });
	}
};

export const searchProducts = searchValue => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/products/search?query_string=${searchValue}`)
		dispatch({
			type: SEARCH_PRODUCTS_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: SEARCH_PRODUCTS_ERROR, payload: error, error: true });
	}
};

export const fetchProductDetail = productId => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/products/${productId}`)
		dispatch({
			type: FETCH_PRODUCT_DETAIL_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_PRODUCT_DETAIL_ERROR, payload: error, error: true });
	}
};

export const fetchProductReviews = productId => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/products/${productId}/reviews`)
		dispatch({
			type: FETCH_PRODUCT_REVIEWS_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_PRODUCT_REVIEWS_ERROR, payload: error, error: true });
	}
};
