import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import Input from 'ui/forms/text-input'
import AddIcon from './add.svg'
import SubtractIcon from './subtract.svg'
import SubtractIconDisabled from './subtract-disabled.svg'

class AddSubtractCta extends Component {
	icon() {
		const {
			type,
			disabled
		} = this.props
		if (type === 'add') {
			return AddIcon
		}
		return disabled ? SubtractIconDisabled : SubtractIcon
	}

	render() {
		const { onClick } = this.props
		return (
			<CircleImg
				src={this.icon()}
				onClick={onClick}
			/>
		)
	}
}

AddSubtractCta.propTypes = {
	type: PropTypes.oneOf(['add', 'subtract']).isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool
}

AddSubtractCta.defaultProps = {
	disabled: false
}

const AddSubtractInput = (props) => {
	const {
		value,
		onChange
	} = props
	return (
		<InputWrap>
			<AddSubtractCta
				type="subtract"
				onClick={() => { onChange(value - 1) }}
				disabled={value === 0}
			/>
			<AddSubtractInput.Input
				center
				width="42px"
				wrapWidth="42px"
				style={{ marginBottom: '0px' }}
				value={value}
			/>
			<AddSubtractCta
				type="add"
				onClick={() => { onChange(value + 1) }}
			/>
		</InputWrap>
	)
}


AddSubtractInput.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
}


export default AddSubtractInput

const CircleImg = styled.img`
	width: 42px;
	height: 42px;
	margin: 0 15px;
	cursor: pointer;
`
const InputWrap = styled.div`
	max-width: 150px;
	margin: 20px 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: space-between;
	align-self: center;
`
AddSubtractInput.Input = styled.input`
	height: 20px;
	width: 20px;
	/* max-width: ${({ width = '100%' }) => width}; */
	text-align: center;
	border: 1px solid grey;
	border-radius: 4px;
	font-size: 14px;
	padding: 10px 11px;
	background-color: white;
	::placeholder {
		color: grey;
	}

`
