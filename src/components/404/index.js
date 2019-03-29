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
	line-height: 90%;
`;
export class NoMatch extends Component {
  render() {
    return (
      <Div>
        <H1>404</H1>
      </Div>
    );
  }
}

export default NoMatch;
