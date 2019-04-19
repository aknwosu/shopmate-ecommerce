import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { login, register } from '../../actionCreators/customers'
import { getCurrentUser } from '../../selectors'


import Modal from '../../ui/ModalBase'
import Cta from '../../ui/CTABtn'

class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	componentDidUpdate(prevProps) {
		console.log('new props', this.props)
		if (this.props.currentUser !== prevProps.currentUser) {
			this.props.history.push('/products')
		}
	}

	handleChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value
		})
	}


	onClickSignin = (event) => {
		// event.stopPropagation()
		const { dispatchLogin, closeModal } = this.props
		const { email, password } = this.state
		dispatchLogin(email, password)
		this.clearState()
		closeModal()
	}

	onClickRegister = (event) => {
		// event.stopPropagation()
		const { dispatchRegister, closeModal } = this.props
		const { name, email, password } = this.state
		dispatchRegister(name, email, password)
		this.clearState()
		closeModal()
	}

	clearState() {
		this.setState({
			name: '',
			password: '',
			email: ''
		})
	}

	render() {
		const { visibleModal, closeModal } = this.props
		const { email, password, name } = this.state
		console.log(this.state)
		return (
			<Modal
				handleClose={closeModal}
			>
				<SignIn.LogInContainer>
					<SignIn.Form>
						{visibleModal === 'signIn' && (
							<Fragment>
								<h1>Sign in</h1>
								<SignIn.FormInput
									type="email"
									placeholder="Email"
									value={email}
									name="email"
									onChange={this.handleChange}
								/>
								<SignIn.FormInput
									type="password"
									placeholder="Password"
									value={password}
									name="password"
									onChange={this.handleChange}
								/>
								<Cta onClick={this.onClickSignin}>Sign In</Cta>
								<div>Have an account?</div>
							</Fragment>
						)}
						{visibleModal === 'register' && (
							<Fragment>
								<h1>Sign Up</h1>
								<SignIn.FormInput
									type="text"
									placeholder="Enter your name..."
									value={name}
									name="name"
									onChange={this.handleChange}
								/>
								<SignIn.FormInput
									type="email"
									placeholder="Email"
									value={email}
									name="email"
									onChange={this.handleChange}
								/>
								<SignIn.FormInput
									type="password"
									placeholder="Password"
									value={password}
									name="password"
									onChange={this.handleChange}
								/>
								<Cta onClick={this.onClickRegister}>Sign Up</Cta>
								<div>Have an account?</div>
							</Fragment>

						)}
					</SignIn.Form>
				</SignIn.LogInContainer>

			</Modal>
		)
	}
}

SignIn.propTypes = {
	visibleModal: PropTypes.string.isRequired,
	// onClose: PropTypes.func.isRequired,
	// CTA: PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => ({
	currentUser: getCurrentUser(state),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
	dispatchLogin: bindActionCreators(login, dispatch),
	dispatchRegister: bindActionCreators(register, dispatch),

})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn))

SignIn.LogInContainer = styled.div`
	height: 380px;
	width: 480px;
	/* background-color: rebeccapurple */
	position: absolute;
	top: 0;
	height: 100%;
	background-color: #ffffff;
	transition: all 0.6s ease-in-out;
`
SignIn.Form = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
`
SignIn.FormInput = styled.input`
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
	font-size: 14px;
`