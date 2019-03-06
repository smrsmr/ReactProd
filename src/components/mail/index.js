import React, { Component } from 'react';
// 异步组件
import AsyncComponent from '@/utils/asyncComponent';
class Mail extends Component {
  renderDetail(pageType) {
	  const Page = AsyncComponent(() => import(`./${pageType}/index`));
	  return Page;
  }
  render() {
	  const pageType = this.props.match.params.id; 
	  const DynamicDetail = this.renderDetail(pageType); 
	  return (
	    <div>
	      <DynamicDetail /> 
	    </div>
	  );
  }
}

export default Mail;