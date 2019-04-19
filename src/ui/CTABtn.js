import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Cta = (props) => {
	const {
		rank,
		...restProps
	} = props

	return (
		<Fragment>
			{rank === 'primary' && <PrimaryCtaButton {...restProps} />}
			{rank === 'secondary' && <SecondaryCtaButton {...restProps} />}
		</Fragment>
	)
}

Cta.propTypes = {
	rank: PropTypes.string,
	right: PropTypes.bool,
	width: PropTypes.string,
	onClick: PropTypes.func.isRequired
}

Cta.defaultProps = {
	rank: 'primary',
	right: false
}

export default Cta


// Base styles
const CtaButton = styled.button`
	width: 220px;
	border: 1px solid;
	border-radius: 27px;
	padding: 15px 30px;
	font-size: 14px;
	line-height: 22px;
	cursor: pointer;
	white-space:nowrap;
	overflow: hidden;
	font-size: 16px;
	
`

const PrimaryCtaButton = styled(CtaButton)`
	background-color: #F62F5E;
	color: white;
`
const SecondaryCtaButton = styled(CtaButton)`
	background-color: white;
	color: #F62F5E;
`
