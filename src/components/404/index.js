import React, { Component } from 'react';
import styled from 'styled-components';
const Div = styled.div`
	width: 100%;
	height: 90%;
	text-align: center;
`;
const H1 = styled.h1`
	font-size: 400px;
	color: #ccc;
	font-weight: bold;
	line-height: 80%;
`;
const H6 = styled.h6`
	font-size: 20px;
	color: #ccc;
	margin-top: -12%;
`;
export class NoMatch extends Component {
  render() {
    return (
      <Div>
        <H1>404</H1>
        <H6>网管说这个界面不让进！！！</H6>
      </Div>
    );
  }
}

export default NoMatch;
