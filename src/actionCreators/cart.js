export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const SET_CART_CONTENT = 'SET_CART_CONTENT';

export const SUBTRACT_FROM_CART = 'SUBTRACT_FROM_CART';

// eslint-disable-next-line import/prefer-default-export
export const addToCart = cartItem => async dispatch => dispatch({ type: ADD_PRODUCT_TO_CART, payload: cartItem })


export const setCartContent = () => async dispatch => dispatch({ type: SET_CART_CONTENT })

export const subtractFromCart = cartItem => async dispatch => dispatch({ type: SUBTRACT_FROM_CART, payload: cartItem })
