// TODO dropdown should be able take possible selections as prop + onChange
import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormField from './formField'
import dropdown from '../assets/drop-down-icon.svg'

const Dropdown = (props) => {
	const {
		onChange,
		options,
		hasEmptySelection,
		emptyLabel,
		label,
		selected,
		error,
		help,
		...restProps
	} = props
	return (
		<FormField {...props}>
			<StDropdown
				error={error}
				{...restProps}
				onChange={(evt) => {
					onChange(evt.target.value)
				}}
				defaultValue={selected}
			>
				{hasEmptySelection && (
					<option value="" key="dropdown-empty__0">{emptyLabel}</option>
				)}
				{options.map((entry, key) => (
					<option
						// eslint-disable-next-line react/no-array-index-key
						key={key}
						value={entry.value}
						// selected={selected === entry.value}
					>
						{entry.label}
					</option>
				))}
			</StDropdown>
		</FormField>
	)
}

Dropdown.propTypes = {
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired,
	selected: PropTypes.string,
	disabled: PropTypes.bool,
	hasEmptySelection: PropTypes.bool,
	label: PropTypes.string,
	emptyLabel: PropTypes.string,
	error: PropTypes.string,
	help: PropTypes.string
}

Dropdown.defaultProps = {
	selected: '',
	disabled: false,
	hasEmptySelection: true,
	emptyLabel: '— Select —'
}

export default Dropdown

const StDropdown = styled.select`
	width: 100%;
	color: #1F1F1F;
	border: #E2E5ED;
	border-radius: 4px;
	box-shadow: inset 0 1px 2px 0 rgba(102,113,123,0.21);
	font-size: 14px;
	padding: 10px;
	margin-bottom: ${props => props.marginBottom || '0'};
	appearance: none;
	background-image: url("${dropdown}");
	background-repeat: no-repeat;
	background-position-x: 96%;
	background-position-y: 50%;
	box-shadow: 0 1px 2px 0 rgba(0,0,0,0.08);
`
