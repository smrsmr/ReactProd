import React, { Component } from 'react';
import styled from 'styled-components';
const Title = styled.h1`
	font-size: 50px;
	color: red;
	text-align: center;
`;
export default class index extends Component {
  render() {
    return (
      <div>
        <Title>Hello</Title>
      </div>
    );
  }
}
