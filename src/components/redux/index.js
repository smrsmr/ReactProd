import React, { Component } from 'react';
import { Button } from 'antd';
import store from '@/redux/store';
import {increse,subtarct} from '@/redux/actions';
export default class index extends Component {
	state = {
	  num: 0,
	  name: 0
	}
	componentDidMount() {
	  // console.log(process.env.NODE_ENV);
	  const state = store.getState();
	 /*  const { num,name } = state.shop;
	  this.setState({ num, name }); */
	  const { num } = state;
	  this.setState({ num });
	  store.subscribe(()=>{
	   /*  const { num,name } = store.getState().shop;
	    this.setState({num,name});
	    console.log(store.getState()); */
	    const state = store.getState();
	    const { num } = state;
	  	this.setState({ num });
	  });
	}
	componentWillUnmount () {
	  // 卸载异步操作设置状态
	  this.setState = () => {
	    return;
	  };
	}
	increase = () => {
	  // store.dispatch({
	  //   type: 'SHOP',
	  //   num: num,
	  //   name: `当前商品总数:${num}`
	  // });
	  store.dispatch(function (dispatch, getState) {
	    if (getState().num >= 40) return;
	    setTimeout(() => {
	      dispatch(increse());
	    },0);
	  });
	  // const { name } = store.getState().shop;
	  // this.setState({num,name});
	  // console.log(store.getState());
	}
	subtract = () => {
	  if (store.getState().num <= 0) return;
	  store.dispatch(subtarct());
	}
	render() {
	  const { num, name } = this.state;
	  return (
	    <div>
	      <h1>{num}</h1>
	      <hr />
	      <h2>{name}</h2>
	      <Button type="primary" onClick={this.increase}>+</Button>
	      <Button type="primary" onClick={this.subtract}>-</Button>
	    </div>
	  );
	}
}
