import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

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
