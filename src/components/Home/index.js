import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Cta from '../../ui/CTABtn';
import heroBg from '../../assets/hero_bg.svg';
import emailIcon from '../../assets/email_icon.svg';
import menTie from '../../assets/men_tie.svg';
import gameBegin from '../../assets/game_begin.svg';
import NonAuthFooter from '../Footer/NonAuthFooter';

export const Home = (props) => {
	const { history: { push } } = props
	return (
		<Home.Container>
			<Home.Hero>
				<h1>
				BackGround and <br /> Development
				</h1>
				<p>
				Convergent the dictates of the consumer:
					<br />
				background and development
				</p>
				<br />
				<Home.Cta
					onClick={() => { push('/products') }}
					rank="secondary"
				>View All
				</Home.Cta>
			</Home.Hero>
			<Home.Promo>
				<PromoLeft>
					<div>
						<h1>WOW</h1>
						<h4>
						Check <br /> WHAT!
						</h4>
					</div>
					<div>
						<h1>AWESOME STUFF!</h1>
					</div>
				</PromoLeft>
				<PromoRight>
					<img src={gameBegin} alt="gameBegin" />
					<PopBadge>POP</PopBadge>
					<h1>Let the Game begin</h1>
					<div onClick={() => { push('/products') }}>CLICK HERE TO BEGIN</div>
				</PromoRight>
			</Home.Promo>
			<Home.Subscibe>
				<SubscibeTitle>10% Discount for your subscription</SubscibeTitle>
				<p>
				Carry the day in style with this extra-large tote crafted in our chic
				B.B. Collection textured PVC. Featuring colorful faux leather trim, this
				tote offers a roomy interior.
				</p>
				<Home.SubscibeForm>
					<input placeholder="Your email here" />
					<SubscibeCta>Subscribe</SubscibeCta>
				</Home.SubscibeForm>
			</Home.Subscibe>
			<Home.Footer />
		</Home.Container>
	);
}
export default Home;

Home.Container = styled.div`
	margin: auto;
	width: 960px;
`;

Home.Hero = styled.div`
	height: 400px;
	background: url(${heroBg});
	color: #fff;
	padding-left: 110px;
	padding-top: 80px;
	h1 {
		line-height: 48px;
	}
	p {
		line-height: 24px;
	}
`;

Home.Cta = styled(Cta)`
	width: 163px;
	font-size: 16px;
`;

Home.Subscibe = styled.div`
	display: flex;
	height: 264px;
	flex-direction: column;
	background-color: #efefef;
	align-items: center;
	padding: 0 250px;
	justify-content: center;
	text-align: center;
`;
Home.SubscibeForm = styled.form`
	input {
		background: #fff url(${emailIcon}) no-repeat 20px 12px;
		padding: 12px 5px 12px 50px;
		border: 1px solid #ccc;
		border-radius: 25px;
		background-color: white;
		width: 250px;
		margin-right: 12px;
	}
`;
Home.Promo = styled.div`
	display: flex;
	height: 648px;
	padding: 30px 0;
`;

const SubscibeTitle = styled.h3`
	margin: 0;
	color: #f62f5e;
`;
const SubscibeCta = styled(Cta)`
	height: 36px;
	width: 90px;
	padding: 2px;
	font-size: 12px;
`;
const PromoLeft = styled.div`
	> div {
		width: 300px;
		height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		:first-child {
			background-color: #84e6f1;
			display: flex;
			flex-direction: column;
			margin-bottom: 30px;
		}
		:nth-child(2) {
			background: url(${menTie});
			color: #fff;
		}
	}
`;
const PromoRight = styled.div`
	h1 {
		margin-bottom: 0;
	}
	margin-left: 15px;
	display: flex;
	align-items: center;
	flex-direction: column;
	box-shadow: 0px 1px 5px 0px #8080807a;
	height: 630px;
	position: relative;
	flex: 1;
`;

const PopBadge = styled.div`
	background-color: #fe5c07;
	position: absolute;
	top: 20px;
	left: 20px;
	color: #fff;
	padding: 0px 8px;
	font-size: 14px;
`;

Home.Footer = styled(NonAuthFooter)`
	width: 163px;
	font-size: 16px;
	margin-left: 10px;
`;
