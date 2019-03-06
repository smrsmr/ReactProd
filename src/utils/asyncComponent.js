import React, { Component } from 'react';
// import {  Redirect } from 'react-router-dom';
const asyncComponent = (importComponent) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        component: null
      };
    }
    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({ component: cmp.default });
        }).catch(() => {
          //出错的时候重定向到首页
          window.location.href = '/';
        });
    }
    componentWillUnmount() {
      // 卸载异步操作设置状态
      this.setState = () => {
        return;
      };
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};
 
export default asyncComponent;