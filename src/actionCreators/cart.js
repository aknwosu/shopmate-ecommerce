import axios from 'axios';

const { REACT_APP_ROOT_URL } = process.env


const headers = {
	'Content-Type': 'application/json',
	// eslint-disable-next-line no-undef
	'USER-KEY': localStorage.getItem('accessToken'),
};

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const SET_CART_CONTENT = 'SET_CART_CONTENT';

export const SUBTRACT_FROM_CART = 'SUBTRACT_FROM_CART';

const GENERATE_SHOPPING_CART_ID_SUCCESS = 'GENERATE_SHOPPING_CART_ID_SUCCESS'
const GENERATE_SHOPPING_CART_ID_ERROR = 'GENERATE_SHOPPING_CART_ID_ERROR'

const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

const ADDED_TO_SHOPPING_CART = 'ADDED_TO_SHOPPING_CART'
const ADDED_TO_SHOPPING_CART_ERROR = 'ADDED_TO_SHOPPING_CART_ERROR'

const GET_SHOPPING_CART_SUCCESS = 'GET_SHOPPING_CART_SUCCESS'
const GET_SHOPPING_CART_ERROR = 'GET_SHOPPING_CART_ERROR'

const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR'

const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS'
const FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR'

export const addToCart = cartItem => async dispatch => dispatch({ type: ADD_PRODUCT_TO_CART, payload: cartItem })


export const setCartContent = () => async dispatch => dispatch({ type: SET_CART_CONTENT })

export const subtractFromCart = cartItem => async dispatch => dispatch({ type: SUBTRACT_FROM_CART, payload: cartItem })

export const generateUniqueCartId = () => async (dispatch, getState) => {
	try {
		const request = await axios.get(`${REACT_APP_ROOT_URL}/shoppingcart/generateUniqueId`)
		dispatch({
			type: GENERATE_SHOPPING_CART_ID_SUCCESS,
			payload: request.data,
		});
		const cartItems = getState().cart.cartItems
		await cartItems.forEach((item) => {
			// eslint-disable-next-line no-plusplus
			for (let i = 1; i <= item.quantity; i++) {
				const cartItem = {}
				cartItem.cart_id = getState().cart.cartID
				cartItem.product_id = item.product_id
				const attributes = []
				attributes.push(item.color, item.size)
				cartItem.attributes = attributes.join(', ')
				dispatch(addToShoppingCart(cartItem))
			}
		})
	} catch (error) {
		dispatch({ type: GENERATE_SHOPPING_CART_ID_ERROR, payload: error, error: true });
	}
}

export const addToShoppingCart = item => async (dispatch, getState) => {
	try {
		const request = await axios.post(`${REACT_APP_ROOT_URL}/shoppingcart/add`, { ...item })
		dispatch(getShoppingCart())
		dispatch({
			type: ADDED_TO_SHOPPING_CART,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: ADDED_TO_SHOPPING_CART_ERROR, payload: error, error: true });
	}
}

export const getShoppingCart = () => async (dispatch, getState) => {
	try {
		const cartId = getState().cart.cartID
		const request = await axios.get(`${REACT_APP_ROOT_URL}/shoppingcart/${cartId}`)
		dispatch({
			type: GET_SHOPPING_CART_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: GET_SHOPPING_CART_ERROR, payload: error, error: true });
	}
}

export const createOrder = () => async (dispatch, getState) => {
	try {
		const state = getState()
		const order = {}
		order.cart_id = state.cart.cartID
		order.shipping_id = state.shipping.shippingType.shipping_id
		order.tax_id = 1
		const request = await axios.post(`${REACT_APP_ROOT_URL}/orders`, { ...order }, { headers })
		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: request.data,
		});
		dispatch(fetchOrder())
	} catch (error) {
		dispatch({ type: CREATE_ORDER_ERROR, payload: error, error: true });
	}
}

export const fetchOrder = () => async (dispatch, getState) => {
	try {
		const state = getState()
		const orderID = state.order.orderID
		const request = await axios.get(`${REACT_APP_ROOT_URL}/orders/${orderID}`, { headers })
		dispatch({
			type: FETCH_ORDER_SUCCESS,
			payload: request.data,
		});
	} catch (error) {
		dispatch({ type: FETCH_ORDER_ERROR, payload: error, error: true });
	}
}


export const deleteCartItem = cartItem => async dispatch => dispatch({ type: DELETE_CART_ITEM, payload: cartItem })
