import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env

const headers = {
	'Content-Type': 'application/json',
	accessToken: localStorage.getItem('accessToken')
};

export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_ERROR = 'FETCH_DEPARTMENT_ERROR';

export const FETCH_DEPARTMENTS_REQUEST = 'FETCH_DEPARTMENTS_REQUEST';
export const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_DEPARTMENTS_SUCCESS';
export const FETCH_DEPARTMENTS_ERROR = 'FETCH_DEPARTMENTS_ERROR';

export const fetchDepartment = id => async (dispatch) => {
	try {
		dispatch({ type: FETCH_DEPARTMENT_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/departments/${id}`, {
			headers
		});
		dispatch({
			type: FETCH_DEPARTMENT_SUCCESS,
			payload: request.data
		});
	} catch (error) {
		dispatch({ type: FETCH_DEPARTMENT_ERROR, payload: error, error: true });
	}
};

export const fetchDepartments = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_DEPARTMENTS_REQUEST });
		const request = await axios.get(`${REACT_APP_ROOT_URL}/departments`);
		dispatch({
			type: FETCH_DEPARTMENTS_SUCCESS,
			payload: request.data
		});
	} catch (error) {
		dispatch({ type: FETCH_DEPARTMENTS_ERROR, payload: error, error: true });
	}
};
