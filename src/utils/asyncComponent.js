import React, { Component } from 'react';
// import { message } from 'antd';
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
          // message.warning('url地址不存在或没权限访问');
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