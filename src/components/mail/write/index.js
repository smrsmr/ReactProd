import React, { Component } from 'react';

class Write extends Component {
	state = {
	  html: '<p>开始写信</p>'
	}

	render() {
	  return (
	    <div>
	      {/*  React 渲染htm */ }
	      <h1 dangerouslySetInnerHTML={{ __html: this.state.html }}></h1>
	      <h2>Write</h2>
	    </div>
	  );
	}
}
export default Write;
