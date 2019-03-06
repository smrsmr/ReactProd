import React, { Component } from 'react';
import { Layout, Menu, Icon, DatePicker, LocaleProvider } from 'antd';
import { hot } from 'react-hot-loader';
//公共样式
import '@/styles/global.less';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
//router
import {routes,setRouter} from '@/router/index';

//react-router-dom
import { Router as HashRouter, Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = createHistory();
//antd
const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
function onChange(date, dateString) {
  console.log(date, dateString);
}
export class Layouts extends Component {
  constructor(props, context) {
	  super(props, context);
	  this.state = {
	    collapsed: false,
	    pathName: null
	  };
  }
  componentWillMount() {
	  //组件挂载之前时候 获取url
	  const pathname = window.location.hash.split('/').filter(i => i);
	  this.setState({
	    pathName: pathname
	  });
  }
	toggle = () => {
	  this.setState({
	    collapsed: !this.state.collapsed
	  });
	}
	MenuClick = () => {
	  //点击侧边栏列表添加样式
	  const pathname = window.location.hash.split('/').filter(i => i);
	  this.setState({
	    pathName: pathname
	  });
	}
	render() {
	  const MenuTree = (
	    routes.map((item,key) => (
	      <Menu
	        key={key}
	        theme="dark"
	        mode="inline"
	        onClick={this.MenuClick}
	        selectedKeys={this.state.pathName}
	      >
	        {
	          //一级路由
	          !item.childrens && !item.exact && (
	            <Menu.Item key={item.key}>
	              <Link to={item.path} replace>
	                <Icon type={item.title.icon} />
	                <span>{item.title.span}</span>
	              </Link>
	            </Menu.Item>
	          )
	        }
	        {
	          //二级路由 
	          item.childrens && !item.exact && (
	            <SubMenu key={item.key} title={<span><Icon type={item.title.icon} /><span>{item.title.span}</span></span>}>
	              {
	                item.childrens.map(v => (
	                  <Menu.Item key={v.key}><Link to={v.path} replace><i className="iconfont" dangerouslySetInnerHTML={{__html:v.iconf}}></i>{v.title}</Link></Menu.Item>
	                ))
	              }
	            </SubMenu>
	          )
	        }
	      </Menu>
	    ))
	  );
	  return (
	    <HashRouter history={history}>
	      <Layout style={{ minHeight: '100vh' }}>
	        <Sider
	          trigger={null}
	          collapsible
	          collapsed={this.state.collapsed}
	          style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}
	        >
	          <div className="logo"><img src={require('@/img/logo.svg')} alt="" /></div>
	          {MenuTree}
	        </Sider>
	        <Layout style={{ marginLeft: 200 }}>
	          <Header style={{ background: '#fff', padding: 0 }}>
	            <Icon
	              className="trigger"
	              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
	              onClick={this.toggle}
	            />
	            <LocaleProvider locale={zh_CN}>
	              <RangePicker
	                showTime={{ format: 'HH:mm' }}
	                format="YYYY-MM-DD HH:mm"
	                placeholder={['Start Time', 'End Time']}
	                onChange={onChange}
	              />
	            </LocaleProvider>
	          </Header>
	          <Content style={{
	            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280
	          }}
	          >
	            {setRouter}
	          </Content>
	        </Layout>
	      </Layout>
	    </HashRouter>
	  );
	}
}

export default hot(module)(Layouts);
