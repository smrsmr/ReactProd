import React, { Component } from 'react';

class Write extends Component {
	state = {
	  html: '<p>开始写信</p>'
	}
	componentDidMount() {
    
	}
	render() {
	  return (
	    <div>
	      {
	        // React 渲染html
	      }
	      <h1 dangerouslySetInnerHTML={{__html:this.state.html}}></h1>
	    </div>
	  );
	}
}
export default Write;
