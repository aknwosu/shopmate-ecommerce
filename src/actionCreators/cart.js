import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env


export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const SET_CART_CONTENT = 'SET_CART_CONTENT';

export const SUBTRACT_FROM_CART = 'SUBTRACT_FROM_CART';

const GENERATE_SHOPPING_CART_ID_SUCCESS = 'GENERATE_SHOPPING_CART_ID_SUCCESS'
const GENERATE_SHOPPING_CART_ID_ERROR = 'GENERATE_SHOPPING_CART_ID_ERROR'

const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
// eslint-disable-next-line import/prefer-default-export
export const addToCart = cartItem => async dispatch => dispatch({ type: ADD_PRODUCT_TO_CART, payload: cartItem })


export const setCartContent = () => async dispatch => dispatch({ type: SET_CART_CONTENT })

export const subtractFromCart = cartItem => async dispatch => dispatch({ type: SUBTRACT_FROM_CART, payload: cartItem })

export const generateUniqueCartId = () => async (dispatch) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/shoppingcart`)
		dispatch({
			type: GENERATE_SHOPPING_CART_ID_SUCCESS,
			payload: request.data,
		});
		dispatch(addToShoppingCart(request))
	} catch (error) {
		dispatch({ type: GENERATE_SHOPPING_CART_ID_ERROR, payload: error, error: true });
	}
}

export const addToShoppingCart = item => async (dispatch, getState) => {
	try {
		console.log('requesting....', item)
		// let cartItem = {}
		// cartItem.
		// const request = await axios.post(`${REACT_APP_ROOT_URL}/shoppingcart/add`)

		// dispatch({
		// 	type: GENERATE_SHOPPING_CART_ID_SUCCESS,
		// 	payload: request.data,
		// });
	} catch (error) {
		dispatch({ type: GENERATE_SHOPPING_CART_ID_ERROR, payload: error, error: true });
	}
}

export const deleteCartItem = cartItem => async dispatch => dispatch({ type: DELETE_CART_ITEM, payload: cartItem })
