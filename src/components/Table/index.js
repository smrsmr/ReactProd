import React, { Component } from 'react';
import { Table, LocaleProvider} from 'antd';
// import Highlighter from 'react-highlight-words';
// import api from '@/api/axios';
// import '@/mock';
import axios from 'axios';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
function fetchPost (current,pageSize){
  return new Promise((resolve, reject) => {
    axios.post('http://127.0.0.1:3001/test',{current:current,pageSize:pageSize})
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export default class index extends Component {
	state = {
	  searchText: '',
	  data: [],
	  height: 722,
	  loading: true,
	  current: 1,
	  pageSize: 30,
	  total: 0,
	  sortedInfo: null,
	  up: 0
	};
	componentDidMount() {
	  let { data, height, loading, current, pageSize, total } = this.state;
	  height = parseInt(window.innerHeight - 240);
	  fetchPost(current, pageSize).then(res => {
	      data = res.data;
	      total = res.total;
	      loading = false;
	      this.setState({ data,height,loading,total });
	  }).catch(e => {
	    console.log(e);
	    loading = false;
	    this.setState({ loading });
	  });
	}
	componentWillUnmount() {
		 this.setState = () => {
	    return;
	  };
	}
	onShowSizeChange = (current, pageSize) => {
	  let { data, height, loading } = this.state;
	  this.setState({loading:true});
	  fetchPost(current, pageSize).then(res => {
	      data = res.data;
	      loading = false;
	      this.setState({ data,height,loading,current,pageSize });
	  }).catch(e => {
	    console.log(e);
	    loading = false;
	    this.setState({ loading });
	  });
	}
	handleChange = (pagination, filters, sorter) => {
	  this.setState({
	    sortedInfo: sorter
	  });
	}
	pagiChange = (current, pageSize) => {
	  let { data, height, loading } = this.state;
	  this.setState({loading:true});
	  fetchPost(current, pageSize).then(res => {
	      data = res.data;
	      loading = false;
	      this.setState({ data,height,loading,current,pageSize });
	  }).catch(e => {
	    console.log(e);
	    loading = false;
	    this.setState({ loading });
	  });
	}
	render() {
	  let { sortedInfo } = this.state;
	  sortedInfo = sortedInfo || {};
	  const columns = [{
	    title: 'Name',
	    dataIndex: 'name',
	    key: 'name',
	    width: '20%'
	  }, {
	    title: 'Date',
	    dataIndex: 'date',
	    key: 'date',
	    width: '15%',
	    sorter: (a, b) => b.date < a.date ? 1 : -1 ,
	    sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order
	  },{
	    title: 'Phone',
	    dataIndex: 'phone',
	    key: 'phone',
	    width: '15%',
	    sorter: (a, b) => a.phone - b.phone,
	    sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order
	  },
	  {
	    title: 'Url',
	    dataIndex: 'url',
	    key: 'url',
	    width: '30%'
	  },
	  {
	    title: 'Address',
	    dataIndex: 'address',
	    key: 'address'
	  }];
	  const { pageSize,total } = this.state;
	  return (
	    <LocaleProvider locale={zh_CN}>
	      <Table
	      columns={columns}
	      dataSource={this.state.data}
	      pagination={{
	        pageSize: pageSize,
	          showSizeChanger: true,
	          pageSizeOptions: ['10','30','50','70','100'],
	        onShowSizeChange: this.onShowSizeChange,
	        showQuickJumper: true,
	          total: total,
	          onChange: this.pagiChange
	      }}
	        scroll={{ y: this.state.height }}
	        loading={this.state.loading}
	        onChange={this.handleChange}
	      />
	    </LocaleProvider>
	  );
	}
}
