import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const modalRoot = document.getElementById('modal-root')
class Modal extends React.Component {
	handleModalClick = (event) => {
		event.stopPropagation()
	}

	render() {
		const {
			children, handleClose, isOpen
		} = this.props
		return ReactDOM.createPortal(
			<Modal.Container isOpen={isOpen} onClick={handleClose}>
				<Modal.Body onClick={this.handleModalClick}>
					{children}
				</Modal.Body>
			</Modal.Container>, modalRoot
		)
	}
}

Modal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	children: PropTypes.node,
	isOpen: PropTypes.bool,
}

Modal.Container = styled.div`
	visibility: visible;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: grid;
	justify-content: center;
	align-items: center;
	opacity: 1;
	background-color: rgba(0,0,0,0.3);
	`

Modal.Body = styled.div`
	/* padding: 20px; */
	background: #fff;
	border-radius: 2px;
	display: inline-block;
	min-height: 300px;
	margin: 1rem;
	position: relative;
	min-width: 300px;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	justify-self: center;
`
export default Modal
