/**
 * router 配置文件
 */
import React from 'react';
import { Route, Switch, Link, Redirect  } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Menu, Icon } from 'antd';
import 'animate.css/animate.min.css';
//utils
import Bundle from '@/utils/Bundle.js';  //router 按需加载
const { SubMenu } = Menu;
const Home = (props) => (<Bundle load={() => import('@/components/home/index')}>{(Home) => <Home {...props}/>}</Bundle>);
const User = (props) => (<Bundle load={() => import('@/components/user/User')}>{(User) => <User {...props}/>}</Bundle>);
const PicturesWall = (props) => (<Bundle load={() => import('@/components/PicturesWall/PicturesWall')}>{(PicturesWall) => <PicturesWall {...props}/>}</Bundle>);
const BarChart = (props) => (<Bundle load={() => import('@/components/barChart/index')}>{(BarChart) => <BarChart {...props}/>}</Bundle>);
const Mail = (props) => (<Bundle load={() => import('@/components/mail/index')}>{(Mail) => <Mail {...props}/>}</Bundle>);
const Table = (props) => (<Bundle load={() => import('@/components/Table/index')}>{(Table) => <Table {...props}/>}</Bundle>);
const Redux = (props) => (<Bundle load={() => import('@/components/redux/index')}>{(Redux) => <Redux {...props}/>}</Bundle>);
const Errors = (props) => (<Bundle load={() => import('@/components/404/index')}>{(Errors) => <Errors {...props}/>}</Bundle>);
export const routes = [
  {
    key: '/',
    path: '/',
    exact: 'exact',
    title: {
      span: '首页'
    },
    component: Home
  },
  {
    key: 'error',
    path: '/error',
    exact: 'exact',
    title: {
      icon: 'error',
      span: 'error'
    },
    component: Errors
  },
  {
    key: 'user',
    path: '/user',
    title: {
      icon: 'user',
      span: '用户中心'
    },
    component: User
  },
  {
    key: 'picturesWall',
    path: '/picturesWall',
    title: {
      icon: 'upload',
      span: '上传图片'
    },
    component: PicturesWall
  },
  {
    key: 'barChart',
    path: '/barChart',
    title: {
      icon: 'bar-chart',
      span: '图形中心'
    },
    // component: require('@/components/barChart/index').default,
    component: BarChart,
    childrens: [
      {
        key: 'line',
        path: '/barChart/line',
        title: '折线图',
        iconf: 'iconzhexiantu'
      },
      {
        key: 'bar',
        path: '/barChart/bar',
        title: '柱状图',
        iconf: 'iconzhuzhuangtu'
      },
      {
        key: 'pie',
        path: '/barChart/pie',
        title: '饼图',
        iconf: 'iconpie-chart'
      },
      {
        key: 'radar',
        path: '/barChart/radar',
        title: '雷达图',
        iconf: 'iconiconset0398'
      }
    ]
  },
  {
    key: 'mail',
    path: '/mail',
    title: {
      icon: 'mail',
      span: '收发邮件'
    },
    component: Mail,
    childrens: [{
      key: 'write',
      path: '/mail/write',
      title: '写信',
      iconf: 'iconwoyaoxiexin'
    },
    {
      key: 'receiving',
      path: '/mail/receiving',
      title: '收信',
      iconf: 'iconshouhuo'
    }]
  },
  {
    key: 'table',
    path: '/table',
    title: {
      icon: 'appstore-o',
      span: '表格'
    },
    component: Table
  },
  {
    key: 'cloudO',
    path: '/cloudO',
    title: {
      icon: 'cloud-o',
      span: 'cloudO'
    },
    component: PicturesWall
  },
  {
    key: 'redux',
    path: '/redux',
    title: {
      iconf: 'iconrdx',
      span: 'redux'
    },
    component: Redux
  },
  {
    key: 'shop',
    path: '/shop',
    title: {
      icon: 'shop',
      span: 'shop'
    },
    component: PicturesWall
  }
];

//渲染侧边栏
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1065831_lsv418ao3il.js'
});
export const MenuTree =(props)=> (
  routes.map((item,key) => (
    <Menu
      key={key}
      theme={props.theme}
      mode={props.mode} 
      onClick={props.MenuClick}
      selectedKeys={props.selectedKeys}
      defaultOpenKeys={props.defaultOpenKeys}
    >
      {
        //一级路由
        !item.childrens && !item.exact && (
          <Menu.Item key={item.key}>
            <Link to={item.path} replace>
              {item.title.icon ? <Icon type={item.title.icon} />:<IconFont type={item.title.iconf} />}
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
                <Menu.Item key={v.key}><Link to={v.path} replace><IconFont type={v.iconf} />{v.title}</Link></Menu.Item>
              ))
            }
          </SubMenu>
        )
      }
    </Menu>
  ))
);
export const SetRouter = (poprs) => (
  <Switch location={poprs.location}>
    {
      routes.map((router,key) => {
        if (router.exact) {
          return <Route exact key={key} path={router.path} component={router.component} />;
        } else {
          if (router.childrens) {
            return <Route key={key} path={`${router.path}/:id`} component={router.component} />;
          }
          return <Route key={key} path={router.path} component={router.component}/>;
        }
      })
    }
    <Route render={() =>
      <Redirect to='/error' />
    }
    >
    </Route>
  </Switch>
);