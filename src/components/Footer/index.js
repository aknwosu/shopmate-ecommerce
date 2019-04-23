import React from 'react'
import styled from 'styled-components'
import instagramIcon from '../../assets/instagram_icon.svg'
import facebookIcon from '../../assets/facebook_icon.svg'
import pinterestIcon from '../../assets/pinterest_icon.svg'
import twitterIcon from '../../assets/twitter_icon.svg'

const footerItems = [
	{
		url: '/',
		label: 'Women'
	},
	{
		url: '/',
		label: 'Men'
	},
	{
		url: '/',
		label: 'Kids'
	},
	{
		url: '/',
		label: 'Shoes'
	},
	{
		url: '/',
		label: 'Brands'
	},
]
const footerIcons = [
	{
		url: '/',
		icon: instagramIcon
	},
	{
		url: '/',
		icon: pinterestIcon
	},
	{
		url: '/',
		icon: twitterIcon
	},
	{
		url: '/',
		icon: facebookIcon
	},
]


export default () => (
	<Footer>
		<div>
			{footerItems.map(({ label, url }) => (
				<li><a href={url}>{label}</a></li>
			))}
		</div>
		<div>
			{footerIcons.map(({ icon, url }) => (
				<SocialIcon><a href={url}><img src={icon} alt="social" /></a></SocialIcon>
			))}
		</div>
		<div>
			<a href="/#"> ©2016 shopmate Ltd</a>  •  <a href="/">Contact</a> • <a href="/">Privacy Policy</a>
		</div>
	</Footer>
)


const Footer = styled.div`
    display: flex;
	flex-direction: column;
    justify-content: space-around;
    padding: 40px;
	background-color: #2E2E2E;
	li {
		list-style-type: none;
		line-height: 24px;
	}

	> div {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;

		:first-child{
			justify-content: space-around;
			padding: 0 20px;
			font-size: 20px;
			color: #fff;
		}
		:last-child{
			color: #6C6C6C;
        	a {
				margin-right: 10px;
				margin-left: 10px;
			}
		}
	}
    
`
const SocialIcon = styled.li`
	margin-right: 10px;
		:nth-child(2){
			margin-right: 20px; 
		}
`
