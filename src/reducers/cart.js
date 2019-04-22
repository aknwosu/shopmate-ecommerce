const initialState = {
	cartItems: [],
	totalPrice: 0,
};
export default function cartReducer(state = initialState, action) {
	switch (action.type) {
	// case 'ADD_PRODUCT_TO_CART': {
	// 	let newState = {
	// 		...state
	// 	}
	// 	if (localStorage.getItem('cartItems')) {
	// 		newState = {
	// 			...state,
	// 			cartItems: JSON.parse(localStorage.getItem('cartItems')),
	// 			totalPrice: Number(localStorage.getItem('totalPrice'))
	// 		}
	// 	}
	// 	const addedItem = action.payload
	// 	const existingItem = newState.cartItems.find(item => (addedItem.product_id === item.product_id) && (addedItem.color === item.color) && (addedItem.size === item.size))
	// 	if (existingItem) {
	// 		const indexOfExistingItem = newState.cartItems.indexOf(existingItem)
	// 		newState.cartItems.splice(indexOfExistingItem, 1)
	// 		existingItem.quantity += addedItem.quantity
	// 		existingItem.price += addedItem.price
	// 		newState.cartItems.push(existingItem)
	// 		newState.totalPrice = (Number(state.totalPrice) + Number(addedItem.price)).toFixed(2)
	// 		localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
	// 		localStorage.setItem('totalPrice', newState.totalPrice);
	// 		return newState
	// 	}
	// 	// addedItem.quantity = 1;
	// 	newState.cartItems.push(addedItem)
	// 	newState.totalPrice = (Number(state.totalPrice) + Number(addedItem.price)).toFixed(2)
	// 	localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
	// 	localStorage.setItem('totalPrice', newState.totalPrice)
	// 	return newState
	// }
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
		const existingItem = newState.cartItems.find(item => (addedItem.product_id === item.product_id) && (addedItem.color === item.color) && (addedItem.size === item.size))
		if (existingItem) {
			const indexOfExistingItem = newState.cartItems.indexOf(existingItem)
			newState.cartItems.splice(indexOfExistingItem, 1)
			existingItem.quantity = addedItem.quantity
			existingItem.price = addedItem.price
			newState.cartItems.push(existingItem)
			newState.totalPrice = (Number(state.totalPrice) - Number(existingItem.price)).toFixed(2)
			newState.totalPrice = (Number(newState.totalPrice) + Number(addedItem.price)).toFixed(2)
			localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
			localStorage.setItem('totalPrice', newState.totalPrice);
			return newState
		}
		// addedItem.quantity = 1;
		newState.cartItems.push(addedItem)
		newState.totalPrice = (Number(state.totalPrice) + Number(addedItem.price)).toFixed(2)
		localStorage.setItem('cartItems', JSON.stringify(newState.cartItems));
		localStorage.setItem('totalPrice', newState.totalPrice)
		return newState
	}
	// case 'REMOVE_PRODUCT_FROM_CART': {
	// 	let newState = {
	// 		...state
	// 	}
	// 	if (localStorage.getItem('cartItems')) {
	// 		newState = {
	// 			...state,
	// 			cartItems: JSON.parse(localStorage.getItem('cartItems')),
	// 			totalPrice: Number(localStorage.getItem('totalPrice'))
	// 		}
	// 	}
	// 	const removedItem = action.payload
	// 	const existingItem = newState.cartItems.find(item => (addedItem.product_id === item.product_id) && (addedItem.color === item.color) && (addedItem.size === item.size))
	// 	return newState
	// }
	case 'SUBTRACT_FROM_CART': {
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
		const indexOfExistingItem = newState.cartItems.indexOf(existingItem)
		const addedItem = action.payload
		const existingItem = newState.cartItems.find(item => (addedItem.product_id === item.product_id) && (addedItem.color === item.color) && (addedItem.size === item.size))
		existingItem.quantity = addedItem.quantity
		newState.cartItems.splice(indexOfExistingItem, 1)
		newState.totalPrice -= existingItem.price
		newState.totalPrice += addedItem.price
		newState.cartItems.push(existingItem)
		// existingItem.quantity += addedItem.quantity
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

	default: return state;
	}
}
