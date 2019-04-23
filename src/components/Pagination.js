import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Pagination = (props) => {
	const { totalCount, onPageChanged, currentPage } = props
	let pagesCount = totalCount && Math.floor(totalCount / 20)
	if (totalCount % 20 !== 0) pagesCount += 1
	const paginationCount = [];
	for (let i = 1; i <= pagesCount; i += 1) {
		paginationCount.push(
			<Pagination.Number key={i} isActive={currentPage === i}>
				<span onClick={() => onPageChanged(i)}>{i}</span>
			</Pagination.Number>
		);
	}
	return (
		<Pagination.Container>
			<Pagination.Wrapper className="pagination">
				{paginationCount}
			</Pagination.Wrapper>
		</Pagination.Container>
	)
}

Pagination.propTypes = {
	totalCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number,
	onPageChanged: PropTypes.func
};
Pagination.defaultProps = {
	currentPage: 1,
}

export default Pagination;


Pagination.Container = styled.div`
width: 100%;`
Pagination.Wrapper = styled.ul`
	display: flex;
  list-style: none;
`
Pagination.Number = styled.li`
	cursor: pointer;
	margin-right: 10px;
	display: inline;
	margin: 0 5px 0 0;
	padding: 8px 11px;
	font-size: 14px;
	color: #06c;
	line-height: 14px;
	overflow: hidden;
	text-decoration: none;
	background: #fafafa;
	background: -webkit-linear-gradient(#FFF,#F6F6F6);
	background: -ms-linear-gradient(#FFF,#F6F6F6);
	background: linear-gradient(#FFF,#F6F6F6);
	border: ${({ isActive }) => (isActive ? 'none' : '1px solid #d3d3d4')};
`
