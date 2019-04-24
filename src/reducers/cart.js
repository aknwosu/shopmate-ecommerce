const initialState = {
	cartItems: [],
	totalPrice: 0,
	cartID: '',
	shoppingCart: [],
};
export default function cartReducer(state = initialState, action) {
	switch (action.type) {
	case 'ADD_PRODUCT_TO_CART': {
		let newState = {
			...state
		}
		if (localStorage.getItem('cartItems')) {
			newState = {
				...state,
				cartItems: JSON.parse(localStorage.getItem('cartItems')),
				totalPrice: Number(localStorage.getItem('totalPrice'))
			}
		}
		const addedItem = action.payload

		const existingItem = newState.cartItems.find(item => ((addedItem.product_id === item.product_id) && (addedItem.color === item.color) && (addedItem.size === item.size) && (addedItem.name === item.name)))
		const existingItemIndex = newState.cartItems.indexOf(existingItem)
		if (existingItem) {
			newState.cartItems[existingItemIndex].quantity += addedItem.quantity
			newState.cartItems[existingItemIndex].price += addedItem.price
		} else {
			newState.cartItems.push(addedItem)
		}
		newState.totalPrice = (Number(state.totalPrice) + Number(addedItem.price)).toFixed(2)

		localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
		localStorage.setItem('totalPrice', newState.totalPrice)
		return newState
	}
	case 'DELETE_CART_ITEM': {
		let newState = {
			...state
		}
		if (localStorage.getItem('cartItems')) {
			newState = {
				...state,
				cartItems: JSON.parse(localStorage.getItem('cartItems')),
				totalPrice: Number(localStorage.getItem('totalPrice'))
			}
		}
		const addedItem = action.payload
		newState.cartItems = newState.cartItems.filter(item => !((addedItem.product_id === item.product_id) && (addedItem.color === item.color) && (addedItem.size === item.size) && (addedItem.name === item.name)))
		newState.totalPrice = (Number(state.totalPrice) - Number(addedItem.price)).toFixed(2)

		localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
		localStorage.setItem('totalPrice', newState.totalPrice)
		return newState
	}

	case 'SET_CART_CONTENT': {
		if (localStorage.getItem('cartItems')) {
			const newState = {
				...state,
				cartItems: JSON.parse(localStorage.getItem('cartItems')),
				totalPrice: localStorage.getItem('totalPrice')
			}
			return newState
		}
		return state
	}
	case 'GENERATE_SHOPPING_CART_ID_SUCCESS': {
		return {
			...state,
			cartID: action.payload.cart_id
		}
	}

	case 'GET_SHOPPING_CART_SUCCESS': {
		return {
			...state,
			shoppingCart: action.payload,
		}
	}

	default: return state;
	}
}
