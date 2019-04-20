import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SizePicker = (props) => {
	const {
		size,
		active,
		...restProps
	} = props
	return (
		<SizePicker.Container
			size={size}
			active={active}
			{...restProps}
		>
			{size}
		</SizePicker.Container>
	)
}

SizePicker.propTypes = {
	size: PropTypes.string.isRequired,
	active: PropTypes.bool,
}
export default SizePicker

SizePicker.Container = styled.div`
	min-width: 40px;
	text-align: center;
  margin: 7px;
	height: 27px;
	text-align: center;
	justify-content: center;
	display: flex;
  font-size: 13px;
	border-radius: 5px;
	border: 0.5px solid #e9e9e9;
	align-items: center;
  cursor: pointer;
	list-style: none;
  color: ${({ active }) => (active ? '#FFF' : '#4E4C4C')};
  background-color: ${({ active }) => (active ? '#F62F5E' : '#EFEFEF')};
	:hover {
    box-shadow: 0 14px 8px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`
