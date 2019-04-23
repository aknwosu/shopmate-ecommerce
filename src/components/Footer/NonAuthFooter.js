import React from 'react'
import styled from 'styled-components'


const footerItems = [{
	header: 'Questions?',
	items: [
		{
			url: '/',
			label: 'Help'
		},
		{
			url: '/',
			label: 'Track Order'
		},
		{
			url: '/',
			label: 'Returns'
		},
	]
}, {
	header: "WHAT'S IN STORE",
	items: [
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
			label: 'Products A-Z'
		},
		{
			url: '/',
			label: 'Buy Gift Voucher'
		},
	]
}, {
	header: 'FOLLOW US',
	items: [
		{
			url: '/',
			label: 'Facebook'
		},
		{
			url: '/',
			label: 'Twitter'
		},
		{
			url: '/',
			label: 'Youtube'
		},
	]
},
{
	items: [
		{
			url: '/',
			label: '©2016 shopmate Ltd'
		}
	]
}]


export default () => (
	<Footer>
		{footerItems.map(({ header, items }) => (
			<div>
				{header && <h3>{header}</h3>}
				{items.map(({ label, url }) => (
					<li><a href={url}>{label}</a></li>
				))}
			</div>
		))}
	</Footer>
)


const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 40px 80px 50px 0px;

	h3 {
		margin-top: 0;
	}

    li {
        list-style-type: none;
        line-height: 24px;
    }
    
`
