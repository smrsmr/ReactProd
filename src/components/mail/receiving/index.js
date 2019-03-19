import React, { Component } from 'react';
import api from '@/api/axios';
import '@/mock';
export class Receiving extends Component {
  componentDidMount() {
    api.mockdata('/data/index')
      .then(res => {
        console.log(res);
      });
  }
  render() {
    return (
      <div>
        <h1>Receiving</h1>
      </div>
    );
  }
}

export default Receiving;
