import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './stripe';
import Modal from '../ui/ModalBase'


class PaySummary extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
				<Modal className="example">
					<h1>Payment</h1>
					<Elements>
						<CheckoutForm />
					</Elements>
				</Modal>
			</StripeProvider>
		);
	}
}

export default PaySummary
