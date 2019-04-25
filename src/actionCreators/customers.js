import axios from 'axios';

const REACT_APP_ROOT_URL = 'https://backendapi.turing.com';
const headers = {
	'Content-Type': 'application/json',
	'USER-KEY': localStorage.getItem('accessToken'),
};


export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';


export const UPDATE_CUSTOMER_ADDRESS_REQUEST = 'UPDATE_CUSTOMER_ADDRESS_REQUEST';
export const UPDATE_CUSTOMER_ADDRESS_SUCCESS = 'UPDATE_CUSTOMER_ADDRESS_SUCCESS';
export const UPDATE_CUSTOMER_ADDRESS_ERROR = 'UPDATE_CUSTOMER_ADDRESS_ERROR';

export const UPDATE_CUSTOMER_CREDIT_CARD_REQUEST = 'UPDATE_CUSTOMER_CREDIT_CARD_REQUEST';
export const UPDATE_CUSTOMER_CREDIT_CARD_SUCCESS = 'UPDATE_CUSTOMER_CREDIT_CARD_SUCCESS';
export const UPDATE_CUSTOMER_CREDIT_CARD_ERROR = 'UPDATE_CUSTOMER_CREDIT_CARD_ERROR';

export const fetchCustomer = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_USER_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/customer`, { headers });
		dispatch({
			type: FETCH_USER_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_USER_ERROR, payload: error, error: true });
	}
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const request = await axios.post(`${REACT_APP_ROOT_URL}/customers`, { name, email, password });
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: REGISTER_USER_ERROR, payload: error, error: true });
	}
};

export const updateCustomer = user => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });
		const request = await axios.put(`${REACT_APP_ROOT_URL}/customer`, { ...user }, { headers });
		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: UPDATE_USER_ERROR, payload: error, error: true });
	}
};


export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_USER_REQUEST });
		const request = await axios.post(`${REACT_APP_ROOT_URL}/customers/login`, { email, password });
		dispatch({
			type: LOGIN_USER_SUCCESS,
			payload: request.data,
		});
		localStorage.setItem('accessToken', request.data.accessToken);
	} catch (error) {
		dispatch({ type: LOGIN_USER_ERROR, payload: error, error: true });
	}
}

export const updateCustomersAddress = data => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_CUSTOMER_ADDRESS_REQUEST });
		await axios.put(`${REACT_APP_ROOT_URL}/customers/address`, { ...data }, { headers });
		dispatch({ type: UPDATE_CUSTOMER_ADDRESS_SUCCESS });
		dispatch(fetchCustomer());
	} catch (error) {
		dispatch({ type: UPDATE_CUSTOMER_ADDRESS_ERROR, payload: error, error: true });
	}
};

export const updateCustomersCreditCard = data => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_CUSTOMER_CREDIT_CARD_REQUEST });
		const request = await axios.put(`${REACT_APP_ROOT_URL}/customers/creditCard`, { data });
		dispatch({
			type: UPDATE_CUSTOMER_CREDIT_CARD_SUCCESS,
		});
	} catch (error) {
		dispatch({ type: UPDATE_CUSTOMER_CREDIT_CARD_ERROR, payload: error, error: true });
	}
};
