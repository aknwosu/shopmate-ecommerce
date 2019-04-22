import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormField from './formField'

const Input = (props) => {
	const {
		onChange = (() => {}),
		error,
		units,
		wrapWidth,
		style,
		...restProps
	} = props
	return (
		<FormField {...props} style={style} width={wrapWidth}>
			<StInput
				error={error}
				{...restProps}
				onChange={(evt) => {
					onChange(evt.target.value)
				}}
			/>
			{units && <Units>{units}</Units>}
		</FormField>
	)
}

Input.propTypes = {
	small: PropTypes.bool,
	inline: PropTypes.bool,
	center: PropTypes.bool,
	label: PropTypes.node,
	units: PropTypes.node,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool
	]),
	help: PropTypes.string,
	onChange: PropTypes.func,
	width: PropTypes.string,
	wrapWidth: PropTypes.string,
	style: PropTypes.object
}

Input.defaultProps = {
	small: false,
	center: false,
	error: null
}

export default Input


const StInput = styled.input`
	width: ${({ width = '100%' }) => width};
	max-width: ${({ width = '100%' }) => width};
	text-align: ${({ center }) => (center ? 'center' : '')};
	border: 1px solid grey;
	border-radius: 4px;
	font-size: 14px;
	padding: 10px 11px;
	background: url(${props => props.background}) no-repeat 95% 50%;
	background-color: white;
	margin-bottom: ${({ marginBottom = '0' }) => marginBottom};
	::placeholder {
		color: #E2E5ED;
	}
`

const Units = styled.span`
	font-size: 12px;
	padding-left: 5px;
`
