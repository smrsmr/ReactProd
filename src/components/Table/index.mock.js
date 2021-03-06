import React, { Component } from 'react';
import { Table, LocaleProvider} from 'antd';
// import Highlighter from 'react-highlight-words';
import api from '@/api/axios';
import '@/mock';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
export default class index extends Component {
	state = {
	  searchText: '',
	  data: [],
	  height: 722,
	  loading: true,
	  current: 1,
	  pageSize: 30,
	  total: 0,
	  sortedInfo: null
	};
	componentDidMount() {
	  let { data, height, loading, current, pageSize, total } = this.state;
	  height = parseInt(window.innerHeight - 240);
	  api.mockdataPost('/data/index',{current:current,pageSize:pageSize})
	    .then(res => {
	      data = res.data;
	      total = res.total;
	      loading = false;
	      this.setState({ data,height,loading,total });
	    });
	}
	componentWillUnmount() {
		 this.setState = () => {
	    return;
	  };
	}
	onShowSizeChange = (current, pageSize) => {
	  let { data, height, loading } = this.state;
	  api.mockdataPost('/data/index',{current:current,pageSize:pageSize})
	    .then(res => {
				
	      data = res.data;
	      loading = false;
	      this.setState({ data,height,loading,current,pageSize });
	    });
	}
	handleChange = (pagination, filters, sorter) => {
	  this.setState({
	    sortedInfo: sorter
	  });
	}
	pagiChange = (current, pageSize) => {
	  let { data, height, loading } = this.state;
	  api.mockdataPost('/data/index',{current:current,pageSize:pageSize})
	    .then(res => {
	      data = res.data;
	      loading = false;
	      this.setState({ data,height,loading,current,pageSize });
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
