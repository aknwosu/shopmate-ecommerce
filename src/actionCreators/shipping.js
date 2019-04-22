import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env

export const FETCH_ALL_SHIPPING_REGIONS_SUCCESS = 'FETCH_ALL_SHIPPING_REGIONS_SUCCESS';
export const FETCH_ALL_SHIPPING_REGIONS_ERROR = 'FETCH_ALL_SHIPPING_REGIONS_ERROR';

export const FETCH_SHIPPING_FOR_REGION_SUCCESS = 'FETCH_SHIPPING_FOR_REGION_SUCCESS';
export const FETCH_SHIPPING_FOR_REGION_ERROR = 'FETCH_SHIPPING_FOR_REGION_ERROR';

export const fetchAllShippingRegions = () => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/shipping/regions`);
		dispatch({
			type: FETCH_ALL_SHIPPING_REGIONS_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_ALL_SHIPPING_REGIONS_ERROR, payload: error, error: true });
	}
};


export const fetchShippingForRegion = regionId => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/shipping/regions/${regionId}`);
		dispatch({
			type: FETCH_SHIPPING_FOR_REGION_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_SHIPPING_FOR_REGION_ERROR, payload: error, error: true });
	}
};
