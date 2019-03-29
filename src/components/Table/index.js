import React, { Component } from 'react';
import { Table, Input, Button, Icon, LocaleProvider} from 'antd';
import Highlighter from 'react-highlight-words';
import api from '@/api/axios';
import '@/mock';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
export default class index extends Component {
	state = {
	  searchText: '',
	  data: [],
	  height: 722,
	  loading: true
	};
	componentWillMount() {
	  let { data, height, loading } = this.state;
	  height = parseInt(window.innerHeight - 240);
	  api.mockdataGet('/data/index')
	    .then(res => {
	      // console.log(res);
	      data = res;
	      loading = false;
	      this.setState({ data,height,loading });
	    });
	}
	componentWillUnmount() {
		 this.setState = () => {
	    return;
	  };
	}
	getColumnSearchProps = (dataIndex) => ({
	  filterDropdown: ({
	    setSelectedKeys, selectedKeys, confirm, clearFilters
	  }) => (
	    <div style={{ padding: 8 }}>
	      <Input
	        ref={node => { this.searchInput = node; }}
	        placeholder={`Search ${dataIndex}`}
	        value={selectedKeys[0]}
	        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
	        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
	        style={{ width: 188, marginBottom: 8, display: 'block' }}
	      />
	      <Button
	        type="primary"
	        onClick={() => this.handleSearch(selectedKeys, confirm)}
	        icon="search"
	        size="small"
	        style={{ width: 90, marginRight: 8 }}
	      >
          Search
	      </Button>
	      <Button
	        onClick={() => this.handleReset(clearFilters)}
	        size="small"
	        style={{ width: 90 }}
	      >
          Reset
	      </Button>
	    </div>
	  ),
	  filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
	  onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
	  onFilterDropdownVisibleChange: (visible) => {
	    if (visible) {
	      setTimeout(() => this.searchInput.select());
	    }
	  },
	  render: (text) => (
	    <Highlighter
	      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
	      searchWords={[this.state.searchText]}
	      autoEscape
	      textToHighlight={text.toString()}
	    />
	  )
	})

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
	
	onShowSizeChange = (current, pageSize) => {
  	console.log(current, pageSize);
	}
	render() {
	  const columns = [{
	    title: 'Name',
	    dataIndex: 'name',
	    key: 'name',
	    width: '20%',
	    ...this.getColumnSearchProps('name')
	  }, {
	    title: 'Date',
	    dataIndex: 'date',
	    key: 'date',
	    width: '15%',
	    ...this.getColumnSearchProps('date')
	  },{
	    title: 'Phone',
	    dataIndex: 'phone',
	    key: 'phone',
	    width: '15%',
	    ...this.getColumnSearchProps('phone')
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
	    key: 'address',
	    ...this.getColumnSearchProps('address')
	  }];
	  return (
	    <LocaleProvider locale={zh_CN}>
	      <Table
	      columns={columns}
	      dataSource={this.state.data}
	      pagination={{
	        pageSize: 30,
	        showSizeChanger: true,
	        onShowSizeChange: this.onShowSizeChange,
	        showQuickJumper: true 
	      }}
	        scroll={{ y: this.state.height }}
	        loading={this.state.loading}
	      />
	    </LocaleProvider>
	  );
	}
}
