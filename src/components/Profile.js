import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Input from '../ui/Input'
import Dropdown from '../ui/dropdown'
import { ErrorText } from '../ui/Typography'
import Modal from '../ui/ModalBase'
import Cta from '../ui/CTABtn';
import { getCurrentUser } from '../selectors'
import { updateCustomersAddress } from '../actionCreators/customers'


class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			address_1: '',
			address_2: '',
			city: '',
			region: '',
			postal_code: '',
			country: '',
			shipping_region_id: '',
			errors: false
		}
	}

	onChange = field => (val) => {
		this.setState({
			[field]: val,
			errors: false
		})
	}

	updateShipping = () => {
		const {
			address_1, address_2, city, region, postal_code, country, shipping_region_id, errors
		} = this.state
		const { dispatchUpdateAddress } = this.props
		if (!address_1 || !city || !region || !postal_code || !country || !shipping_region_id) {
			this.setState({ errors: true })
		}
		dispatchUpdateAddress(this.state)
	}

	render() {
		console.log('modal open')
		const {
			address_1, address_2, city, region, postal_code, country, shipping_region_id, errors
		} = this.state
		return (
			<Modal>
				<Profile.Container>
					<Profile.InfoRow>
						<Input
							label="Address line 1 *"
							type="text"
							onChange={this.onChange('address_1')}
							value={address_1}
							autoFocus
						/>
						<Input
							label="Address line 2"
							type="text"
							onChange={this.onChange('address_2')}
							value={address_2}
							autoFocus
						/>
					</Profile.InfoRow>
					<Profile.InfoRow>
						<Input
							label="City *"
							type="text"
							onChange={this.onChange('city')}
							value={city}
							autoFocus
						/>
						<Input
							label="Region *"
							type="text"
							onChange={this.onChange('region')}
							value={region}
							autoFocus
						/>

					</Profile.InfoRow>
					<Profile.InfoRow>
						<Input
							label="Postal Code *"
							type="text"
							onChange={this.onChange('postal_code')}
							value={postal_code}
							autoFocus
						/>
						<Input
							label="Country"
							type="text"
							onChange={this.onChange('country')}
							value={country}
							autoFocus
						/>
					</Profile.InfoRow>
					{/* <Dropdown /> */}
					<div>Shipping Region</div>
					{errors && <div>The fields marked with * are required</div>}
					<Cta onClick={this.updateShipping}>Next step</Cta>
				</Profile.Container>
			</Modal>
		)
	}
}
const mapStateToProps = (state, ownProps) => ({
	currentUser: getCurrentUser(state),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatchUpdateAddress: bindActionCreators(updateCustomersAddress, dispatch)

})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


Profile.FormInput = styled.input`
	background-color: #eee;
	border: none;
	padding: 12px 25px;
	margin: 8px 0;
	width: 100%;
	font-size: 14px;
`
Profile.Container = styled.div`
	background-color: white;
	width: 940px;
	height: 960px;
`
Profile.InfoRow = styled.div`
	display: flex;
	justify-content: space-around;
	> * {
		width: 350px;
		
	}
`
