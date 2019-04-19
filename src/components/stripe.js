import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
// import { injectStripe } from 'react-stripe-elements'
class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		const { token } = await this.props.stripe.createToken();
		const data = {
			stripeToken: token.id,
			order_id: 1,
			description: 1,
			amount: 56,
		}
		const response = await axios({
			method: 'post',
			url: 'https://backendapi.turing.com/stripe/charge',
			headers: { 'Content-Type': 'application/json', 	'user-key': localStorage.getItem('accessToken'), },
			data
		});

		if (response.ok) console.log('Purchase Complete!')
	}

	render() {
		return (
			<div className="checkout">
				<p>Would you like to complete the purchase?</p>
				<CardElement style={{ base: { fontSize: '18px' } }} />
				<button onClick={this.submit}>Send</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
