import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { Router as HashRouter, Link  } from 'react-router-dom';
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
	static contextTypes = {
	  router: PropTypes.object
	}
	constructor(props, context) {
	  super(props, context);
	  this.newTabIndex = 0;
	  this.titleName = null;
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
	  const pn = window.location.hash.replace('#', '');
	  this.setState({
	    pathName: pathname,
	    activeKey: pn
	  });
	  //显示标签名字
	  routes.forEach(v => {
	    if (!v.hasOwnProperty('childrens') && v.key === pn.replace('/','')) {
	      this.titleName = v.title.span;
	      return;
	    }
	    if (v.hasOwnProperty('childrens')) {
	      const vName = v.childrens.filter(v => v.path === pn);
	      if (vName.length > 0) {
	        this.titleName = vName[0].title;
	      }
	    }
	  });
	  if (pn==='#') {
	    return false;
	  }
	  panes.push({ title: this.titleName ,content: '', key: pn });
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
	  this.setState({
	    pathName: pathname
	  });
	 
	  // const pn = window.location.hash.split('/').filter(i => i).pop();
	  const pn = window.location.hash.replace('#','');
	  this.add(pn);
	}
	//Tabs
	onChange = (activeKey) => {
	  //点击tabs切换同步侧边栏
	  const paneActive = activeKey.split('/').filter(i => i);
	  paneActive.unshift('#');
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
	  paneTarget.unshift('#');
	  //删除标签的时候 路由切换到上一个位置
	  if (panes.length <= 0) {
	    history.push('/');
	    this.setState({
	      pathName: ['']
	    });
	  } else {
	    history.push(activeKey);
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
	  history.push(url);
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
	                defaultActiveKey={this.state.activeKey}
	                tabBarGutter={10}
	                onTabClick={this.TabsClick}
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
