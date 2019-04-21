import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env

export const FETCH_ATTRIBUTES_REQUEST = 'FETCH_ATTRIBUTES_REQUEST';
export const FETCH_ATTRIBUTES_SUCCESS = 'FETCH_ATTRIBUTES_SUCCESS';
export const FETCH_ATTRIBUTES_ERROR = 'FETCH_ATTRIBUTES_ERROR';

export const FETCH_ATTRIBUTE_REQUEST = 'FETCH_ATTRIBUTE_REQUEST';
export const FETCH_ATTRIBUTE_SUCCESS = 'FETCH_ATTRIBUTE_SUCCESS';
export const FETCH_ATTRIBUTE_ERROR = 'FETCH_ATTRIBUTE_ERROR';

export const FETCH_ATTRIBUTE_VALUE_REQUEST = 'FETCH_ATTRIBUTE_VALUE_REQUEST';
export const FETCH_ATTRIBUTE_VALUE_SUCCESS = 'FETCH_ATTRIBUTE_VALUE_SUCCESS';
export const FETCH_ATTRIBUTE_VALUE_ERROR = 'FETCH_ATTRIBUTE_VALUE_ERROR';

export const FETCH_PRODUCT_ATTRIBUTES_REQUEST = 'FETCH_PRODUCT_ATTRIBUTES_REQUEST';
export const FETCH_PRODUCT_ATTRIBUTES_SUCCESS = 'FETCH_PRODUCT_ATTRIBUTES_SUCCESS';
export const FETCH_PRODUCT_ATTRIBUTES_ERROR = 'FETCH_PRODUCT_ATTRIBUTES_ERROR';

export const fetchAttributes = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_ATTRIBUTES_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/attributes`)
		dispatch({
			type: FETCH_ATTRIBUTES_SUCCESS,
			payload: request.data,
		});
		request.data.map(attribute => dispatch(fetchAttributeValue(attribute)))
	} catch (error) {
		dispatch({ type: FETCH_ATTRIBUTES_ERROR, payload: error, error: true });
	}
};

export const fetchAttribute = attributeId => async (dispatch) => {
	try {
		dispatch({ type: FETCH_ATTRIBUTE_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/attributes/${attributeId}`)
		dispatch({
			type: FETCH_ATTRIBUTE_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_ATTRIBUTE_ERROR, payload: error, error: true });
	}
};

export const fetchAttributeValue = attribute => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/attributes/values/${attribute.attribute_id}`)
		const payload = {}
		payload.attributeName = attribute.name
		payload.attribute_id = attribute.attribute_id
		payload.values = request.data

		dispatch({
			type: FETCH_ATTRIBUTE_VALUE_SUCCESS,
			payload
		});
	} catch (error) {
		dispatch({ type: FETCH_ATTRIBUTE_VALUE_ERROR, payload: error, error: true });
	}
};

export const fetchProductAttributes = productId => async (dispatch) => {
	try {
		dispatch({ type: FETCH_PRODUCT_ATTRIBUTES_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/attributes/inProduct/${productId}`)
		dispatch({
			type: FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_PRODUCT_ATTRIBUTES_ERROR, payload: error, error: true });
	}
};
