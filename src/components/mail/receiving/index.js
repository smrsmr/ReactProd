import React, { Component } from 'react';
import styled from 'styled-components';
const Title = styled.h1`
	font-size: 50px;
	color: red;
	text-align: center;
`;

export class Receiving extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Title>Receiving</Title>
      </div>
    );
  }
}

export default Receiving;
