import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FormField = (props) => {
	const {
		label,
		error,
		help,
		inline,
		children,
		width,
		style
	} = props
	return (
		<FieldWrap inline={inline} width={width} style={style}>
			{label && (<FieldLabel>{label}</FieldLabel>)}
			{children}
			{help && !error && (<FieldHelp>{help}</FieldHelp>)}
			{typeof error === 'string' && (<FieldError>{error}</FieldError>)}
		</FieldWrap>
	)
}

FormField.propTypes = {
	children: PropTypes.node.isRequired,
	label: PropTypes.node,
	inline: PropTypes.bool,
	style: PropTypes.object,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool
	]),
	help: PropTypes.string,
	width: PropTypes.string
}

FormField.defaultProps = {
	error: null,
	inline: false
}

export default FormField

export const FieldHelp = styled.div`
	font-size: 12px;
	margin-top: 3px;
	font-style: italic;
	color: '#909090';
`

export const FieldError = styled.div`
	font-size: 12px;
	margin-top: 3px;
	font-style: italic;
	color: red;
`

export const FieldLabel = styled.div`
	font-size: 14px;
	margin-bottom: 3px;
	color: #000000;
`

export const FieldWrap = styled.div`
	margin-bottom: 15px;
	display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
	width: ${({ width = '100%' }) => width};
`
