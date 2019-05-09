import React, { Component } from 'react';
import { Button } from 'antd';
import { store } from '@/redux/store';
export default class index extends Component {
	state = {
	  num: 0,
	  name: 0
	}
	componentDidMount() {
	  // console.log(process.env.NODE_ENV);
	  const state = store.getState();
	  const { num,name } = state.shop;
	  this.setState({num,name});
	}
	btn = () => {
	  const state = store.getState();
	  let { num } = state.shop;
	  num++;
	  store.dispatch({
	    type: 'SHOP',
	    num: num,
	    name: `当前商品总数:${num}`
	  });
	  const { name } = store.getState().shop;
	  this.setState({num,name});
	  console.log(store.getState());
	}
	render() {
	  const { num, name } = this.state;
	  return (
	    <div>
	      <h1>{num}</h1>
	      <hr />
	      <h2>{name}</h2>
	      <Button type="primary" onClick={this.btn}>click</Button>
	    </div>
	  );
	}
}
