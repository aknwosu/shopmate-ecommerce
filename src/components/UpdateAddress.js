/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Input from '../ui/Input'
import Dropdown from '../ui/dropdown'
import { ErrorText, PrimaryTitle } from '../ui/Typography'
import Modal from '../ui/ModalBase'
import Cta from '../ui/CTABtn';
import { getCurrentUser } from '../selectors'
import { updateCustomersAddress } from '../actionCreators/customers'
import { generateUniqueCartId } from '../actionCreators/cart'
import { fetchAllShippingRegions, fetchShippingForRegion, updateShippingType } from '../actionCreators/shipping'


class UpdateAddress extends Component {
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
			shipping_id: '',
			errors: false
		}
	}

	componentDidMount() {
		const {
			dispatchFetchAllRegions, currentUser: {
				address_1, address_2, city, region, postal_code, country, shipping_region_id, errors,
			}
		} = this.props
		dispatchFetchAllRegions()

		this.setState({
			address_1, address_2, city, region, postal_code, country, shipping_region_id
		})
	}

	componentDidUpdate() {
		const {
			dispatchFetchAllRegions, currentUser: {
				address_1, address_2, city, region, postal_code, country, shipping_region_id, errors,
			}
		} = this.props
		if (address_1 !== this.state.address_1 && city !== this.state.city) {
			dispatchFetchAllRegions()

			this.setState({
				address_1, address_2, city, region, postal_code, country, shipping_region_id
			})
		}
	}


	onChange = field => (val) => {
		const { dispatchFetchShippingForRegion } = this.props
		if (field === 'region') {
			val = JSON.parse(val)
			if (val === 1) return this.setState({ region: '' })
			dispatchFetchShippingForRegion(val.shipping_region_id)
			return this.setState({
				shipping_region_id: val.shipping_region_id,
				region: val.shipping_region
			})
		}
		return this.setState({
			[field]: val,
			errors: false
		})
	}

	onChangeShipping = ({ target: { name, value } }) => {
		const { dispatchUpdateShippingType } = this.props
		this.setState({
			[name]: value,
		})
		dispatchUpdateShippingType(value)
	}

	updateShipping = () => {
		const {
			address_1, address_2, city, region, postal_code, country, shipping_region_id, errors, shipping_id
		} = this.state
		const { shippingType } = this.props
		const { dispatchUpdateAddress, 	dispatchGenerateUniqueCartId, push } = this.props
		if (!address_1 || !city || !region || !postal_code || !country || !shipping_region_id || !shipping_id || !shippingType) {
			return this.setState({ errors: true })
		}
		dispatchUpdateAddress(this.state)
		dispatchGenerateUniqueCartId()
		return push('/checkout')
	}

	render() {
		const {
			address_1, address_2, city, region, postal_code, country, shipping_region_id, errors,
		} = this.state
		const { shippingRegions, shippingForRegion } = this.props
		const availableRegions = []
		// eslint-disable-next-line array-callback-return
		shippingRegions.map((region) => {
			const modRegion = { ...region }
			modRegion.value = JSON.stringify({ ...region })
			modRegion.label = region.shipping_region
			availableRegions.push(modRegion)
		})
		return (
			<UpdateAddress.Container>
				<UpdateAddress.Title>Update your shipping address</UpdateAddress.Title>
				<UpdateAddress.InfoRow>
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
				</UpdateAddress.InfoRow>
				<UpdateAddress.InfoRow>
					<Input
						label="City *"
						type="text"
						onChange={this.onChange('city')}
						value={city}
						autoFocus
					/>
					<Dropdown
						label="Region *"
						type="text"
						options={availableRegions}
						hasEmptySelection={false}
						onChange={this.onChange('region')}
					/>
				</UpdateAddress.InfoRow>
				<UpdateAddress.InfoRow>
					<Input
						label="Postal Code *"
						type="text"
						onChange={this.onChange('postal_code')}
						value={postal_code}
						autoFocus
					/>
					<Input
						label="Country *"
						type="text"
						onChange={this.onChange('country')}
						value={country}
						autoFocus
					/>
				</UpdateAddress.InfoRow>
				<UpdateAddress.Ship>
					<div>Select Shipping *</div>
					{shippingForRegion.map(shipping => (
						<div>
							<input
								label="Country"
								type="radio"
								name="shipping_id"
								onChange={this.onChangeShipping}
								value={shipping.shipping_id}
							/>{shipping.shipping_type}
						</div>

					))}
					{errors && <div>The fields marked with * are required</div>}
					<Cta onClick={this.updateShipping}>Next step</Cta>
				</UpdateAddress.Ship>

			</UpdateAddress.Container>
		)
	}
}

UpdateAddress.propTypes = {
	currentUser: PropTypes.object.isRequired,
	dispatchFetchAllRegions: PropTypes.func.isRequired,
	dispatchUpdateAddress: PropTypes.func.isRequired,
	shippingRegions: PropTypes.array,
	shippingForRegion: PropTypes.array,
	dispatchFetchShippingForRegion: PropTypes.func.isRequired,
	dispatchGenerateUniqueCartId: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	dispatchUpdateShippingType: PropTypes.func.isRequired,
}
const mapStateToProps = (state, ownProps) => ({
	currentUser: state.customers.user,
	shippingRegions: state.shipping.shippingRegions,
	shippingForRegion: state.shipping.shippingForRegion,
	shippingType: state.shipping.shippingType,
	push: ownProps.history.push
})
const mapDispatchToProps = dispatch => ({
	dispatchUpdateAddress: bindActionCreators(updateCustomersAddress, dispatch),
	dispatchFetchAllRegions: bindActionCreators(fetchAllShippingRegions, dispatch),
	dispatchFetchShippingForRegion: bindActionCreators(fetchShippingForRegion, dispatch),
	dispatchUpdateShippingType: bindActionCreators(updateShippingType, dispatch),
	dispatchGenerateUniqueCartId: bindActionCreators(generateUniqueCartId, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateAddress))


UpdateAddress.FormInput = styled.input`
	background-color: #eee;
	border: none;
	padding: 12px 25px;
	margin: 8px 0;
	width: 100%;
	font-size: 14px;
`
UpdateAddress.Container = styled.div`
	background-color: white;
	width: 940px;
	padding-top: 40px;
  margin: 40px auto;
	@media screen and (max-width: 425px) {
		width: 100vw;
	}
`
UpdateAddress.InfoRow = styled.div`
	display: flex;
	justify-content: space-around;
	> * {
		width: 350px;
		
	}
	@media screen and (max-width: 425px) {
	flex-direction: column;
  padding: 10px 10px;
	}
`
UpdateAddress.Title = styled(PrimaryTitle)`
	text-align: center;
`
UpdateAddress.Ship = styled.div`
	padding-left: 55px;
	display: flex;
	flex-direction: column;
	> * {
		margin-top: 30px;
		margin-bottom: 30px;
		
	}
`
