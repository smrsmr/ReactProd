
import React, { Component } from 'react';
import { Layout, Icon, DatePicker, LocaleProvider,Tabs } from 'antd';
import { hot } from 'react-hot-loader';
//公共样式
import '@/styles/global.less';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
//router
import {routes,SetRouter,MenuTree} from '@/router/index';
//react-router-dom
import { Router } from 'react-router-dom';
import history  from '@/history.js';
//antd
const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const {TabPane} = Tabs;
function onChange(date, dateString) {
  console.log(date, dateString);
}
export class Layouts extends Component {
  constructor(props, context) {
	  super(props, context);
	  this.newTabIndex = 0;    //创建新tab的Index
	  this.titleName = 'error';  //默认tabs文本
	  this.isClosable = true; //tabs 是否可被关闭
	  const panes = [{ title: '首页' ,content: '', key: '/', closable: false }];
	  this.state = {
	    collapsed: false,
	    pathName: null,
	    marginLeft: true,
	    activeKey: null,
	    defaultOpenKeys: [],
	    panes
	  }; 
  }
  componentWillMount() {
	  const { panes,defaultOpenKeys } = this.state;
	  //组件挂载之前时候 获取url
	  const pathname = history.location.pathname.split('/').filter(i => i);
	  const pn = window.location.pathname;
	  this.setState({
	    pathName: pathname,
	    activeKey: pn
	  });
	  //显示标签名字
	  routes.forEach(v => {
	    if (!v.hasOwnProperty('childrens') && v.path === pn) {
	      this.titleName = v.title.span;
	      return;
	    }
	    if (v.hasOwnProperty('childrens')) {
	      const vName = v.childrens.filter(v => v.path === pn);
	      if (vName.length > 0) {
	        this.titleName = vName[0].title;
	        defaultOpenKeys.push(v.key);
	      }
	    }
	  });
	  if (pn==='/') {   //判断首页 则不添加tabs
	    return false;
	  }
	  panes.push({ title: this.titleName, content: '', key: pn });
  }
	toggle = () => {
	  //切换侧边栏展开与收缩 
	  this.setState({
	    collapsed: !this.state.collapsed,
	    marginLeft: !this.state.marginLeft
	  });
	}
	MenuClick = () => {
	  //点击侧边栏列表添加样式
	  const pathname = window.location.pathname.split('/').filter(i => i);
	  this.setState({
	    pathName: pathname
	  });
	  const pn = window.location.pathname;
	  this.add(pn);
	}
	//Tabs
	onChange = (activeKey) => {
	  //点击tabs切换同步侧边栏
	  const paneActive = activeKey.split('/').filter(i => i);
	  this.setState({
	    activeKey: activeKey,
	    pathName: paneActive
	  });
	}

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = (name) => {
    const { panes } = this.state;
    const activeKey = name;
    const panesKey = panes.filter(pane => pane.key === name);
    //显示标签名字
    routes.forEach(v => {
      if (!v.hasOwnProperty('childrens') && v.key === name.replace('/','')) {
        this.titleName = v.title.span;
        return;
      }
      if (v.hasOwnProperty('childrens')) {
        const vName = v.childrens.filter(v => v.path === name);
        if (vName.length > 0) {
          this.titleName = vName[0].title;
        }
      }
    });
    this.setState({ panes, activeKey });
    if (panesKey.length > 0) {
      return false;
    }
    panes.push({ title: this.titleName, content: '', key: activeKey });
  }

	remove = (targetKey) => {
	  //删除tabs标签 方法
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
	  const paneTarget = activeKey.split('/').filter(i => i);
	  if (panes.length <= 0) {
	    //当tabs为0的时候去除侧边栏点击的样式
	    this.setState({
	      pathName: ['']
	    });
	  } else {
	    // 防止重复点击
	    if (history.location.pathname !== activeKey) history.push(activeKey);
	    this.setState({
	      pathName: paneTarget
	    });
	  }
	  this.setState({
	    panes: panes,
	    activeKey: activeKey
	  });
	}
	TabsClick = (url) => {
	  //点击tabs的时候切换相应路由
	  if (history.location.pathname !== url) history.push(url);
	}
	render() {
	  return (
	    <div className="Layout">
	      <Router history={history}>
	        <Layout style={{ minHeight: '100vh' }}>
	          <Sider
	            trigger={null}
	            collapsible
	            collapsed={this.state.collapsed}
	            style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}
	          >
	            <div className="logo"><img src={require('@/img/logo.svg')} alt="" /></div>
	            <MenuTree
	              theme="light"
	        			mode="inline"
	              MenuClick={this.MenuClick}
	              selectedKeys={this.state.pathName}
	              defaultOpenKeys={this.state.defaultOpenKeys}
	            />
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
	              margin: '0', padding: '0 0 0 24px', background: '#fff', minHeight: 280, position: 'relative'
	            }}
	            >
	              <Tabs
	                hideAdd
	                onChange={this.onChange}
	                activeKey={this.state.activeKey}
	                type="editable-card"
	                onEdit={this.onEdit}
	                defaultActiveKey={this.state.activeKey}
	                tabBarGutter={10}
	                onTabClick={this.TabsClick}
	              >
	                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}></TabPane>)}
	              </Tabs>
	              <SetRouter location={history.location} />
	            </Content>
	          </Layout>
	        </Layout>
	      </Router>
	    </div>
	  );
	}
}
export default process.env.NODE_ENV === 'development' ? hot(module)(Layouts) : Layouts;
