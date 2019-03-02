import React, { Component } from 'react';
class index extends Component {
	state = {
	  ID: null
	}
	componentWillMount() {
	  this.setState({
	    ID: this.props.match.params.id
	  });
	}
	renderDetail(pageType) {
	  const dynamicDetail = require(`./${pageType}/index`).default;
	  return dynamicDetail;
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

export default index;