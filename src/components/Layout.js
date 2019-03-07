import React, { Component } from 'react';
import { Layout, Menu, Icon, DatePicker, LocaleProvider,Tabs } from 'antd';
import { hot } from 'react-hot-loader';
//公共样式
import '@/styles/global.less';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
//router
import {routes,setRouter} from '@/router/index';
//react-router-dom
// import { BrowserRouter , Link } from 'react-router-dom';
import { Router as HashRouter, Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
const history = createHistory();
//antd
const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
const {TabPane} = Tabs;
function onChange(date, dateString) {
  console.log(date, dateString);
}
export class Layouts extends Component {
  constructor(props, context) {
    super(props, context);
    this.newTabIndex = 0;
    const panes = [];
	  this.state = {
	    collapsed: false,
      pathName: null,
      marginLeft: true,
      activeKey: null,
      panes
	  };
  }
  componentWillMount() {
    const { panes } = this.state;
	  //组件挂载之前时候 获取url
    const pathname = window.location.hash.split('/').filter(i => i);
    // const pathname = window.location.pathname.split('/').filter(i => i);
	  this.setState({
	    pathName: pathname
    });
    const pn = pathname.pop();
    panes.push({ title: pn , key: pn });
  }

	toggle = () => {
	  this.setState({
	    collapsed: !this.state.collapsed,
	    marginLeft: !this.state.marginLeft
	  });
	}
	MenuClick = () => {
	  //点击侧边栏列表添加样式
	  const pathname = window.location.hash.split('/').filter(i => i);
	  const pn = pathname.pop();
	  this.setState({
	    pathName: pathname
	  });
	  this.add(pn);
	}
	//Tabs
	onChange = (activeKey) => {
	  this.setState({ activeKey });
	}

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = (name) => {
    const { panes } = this.state;
    const activeKey = name;
    panes.push({ title: name, content: '', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let {activeKey} = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }
  render() {
	  const MenuTree = (
	    routes.map((item,key) => (
	      <Menu
	        key={key}
	        theme="light"
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
	    <div className="Layout">
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
	          <Layout style={{ marginLeft: this.state.marginLeft ? 200 : 80 }}>
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
	              margin: '0', padding: '0 0 0 24px', background: '#fff', minHeight: 280
	            }}
	            >
	              <Tabs
	                hideAdd
	                onChange={this.onChange}
	                activeKey={this.state.activeKey}
	                type="editable-card"
	                onEdit={this.onEdit}
	              >
	                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
	              </Tabs>
	              {setRouter}
	            </Content>
	          </Layout>
	        </Layout>
	      </HashRouter>
	    </div>
	  );
  }
}

export default hot(module)(Layouts);
