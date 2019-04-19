export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const SET_CART_CONTENT = 'SET_CART_CONTENT';

// eslint-disable-next-line import/prefer-default-export
export const addToCart = product => async dispatch => dispatch({ type: ADD_PRODUCT_TO_CART, payload: product })
export const setCartContent = () => async dispatch => dispatch({ type: SET_CART_CONTENT })
