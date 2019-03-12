import React, { Component } from 'react';
import styled from 'styled-components';
import '@/styles/comms.less';
const Title = styled.h1`
	font-size: 23px;
	color: red;
`;
class home extends Component {
  render() {
    return (
      <div className="App">
        <Title>Hello,React</Title>
      </div>
    ); 
  }
}

export default home; 