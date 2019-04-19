const initialState = {
	cartItems: [],
	totalPrice: 0,
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
				totalPrice: JSON.parse(localStorage.getItem('totalPrice'))
			}
		}
		const addedItem = action.payload
		const existingItem = newState.cartItems.find(item => addedItem.product_id === item.product_id)
		if (existingItem) {
			addedItem.quantity += 1
			newState = {
				...state,
				totalPrice: state.totalPrice + Number(addedItem.price),
			}
			localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
			localStorage.setItem('totalPrice', newState.totalPrice);
			return newState
		}
		addedItem.quantity = 1;
		newState.cartItems.push(addedItem)
		newState.totalPrice = state.totalPrice + Number(addedItem.price)
		localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
		localStorage.setItem('totalPrice', newState.totalPrice)
		return newState
	}
	case 'SET_CART_CONTENT': {
		if (localStorage.getItem('cartItems')) {
			const newState = {
				...state,
				cartItems: JSON.parse(localStorage.getItem('cartItems')),
				totalPrice: JSON.parse(localStorage.getItem('totalPrice'))
			}
			return newState
		}
		return state
	}

	default: return state;
	}
}
