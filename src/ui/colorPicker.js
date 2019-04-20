import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ColorPicker = ({ color, active }) => (
	<ColorPicker.Container
		color={color}
		active={active}
	/>
)
ColorPicker.Container = styled.li`
background-color: ${({ color }) => color};
height: 25px;
width: 25px;
border-radius: 5px;
border: 0.5px solid #e9e9e9;
list-style: none;
margin: 7px;
cursor: pointer;
border:  ${({ active }) => (active ? '2px solid' : '0.5px solid #e9e9e9')};
:hover {
	box-shadow: 0 14px 8px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
`
ColorPicker.propTypes = {
	color: PropTypes.string.isRequired,
	active: PropTypes.bool,
}
export default ColorPicker
