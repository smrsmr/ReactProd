/**
 * router 配置文件
 */
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
//utils
import Bundle from '@/utils/Bundle.js';
//404组件
import NoMatch from '@/components/404/NoMatch';
const { SubMenu } = Menu;
const Home = (props) => (<Bundle load={() => import('@/components/home/index')}>{(Home) => <Home {...props}/>}</Bundle>);
const User = (props) => (<Bundle load={() => import('@/components/user/User')}>{(User) => <User {...props}/>}</Bundle>);
const PicturesWall = (props) => (<Bundle load={() => import('@/components/PicturesWall/PicturesWall')}>{(PicturesWall) => <PicturesWall {...props}/>}</Bundle>);
const BarChart = (props) => (<Bundle load={() => import('@/components/barChart/index')}>{(BarChart) => <BarChart {...props}/>}</Bundle>);
const Mail = (props) => (<Bundle load={() => import('@/components/mail/index')}>{(Mail) => <Mail {...props}/>}</Bundle>);
const Table = (props) => (<Bundle load={() => import('@/components/Table/index')}>{(Table) => <Table {...props}/>}</Bundle>);
export const routes = [
  {
    key: 'home',
    path: '/home',
    exact: 'exact',
    title: {
      span: '首页'
    },
    component: Home
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
        iconf: '&#xe600;'
      },
      {
        key: 'bar',
        path: '/barChart/bar',
        title: '柱状图',
        iconf: '&#xe601;'
      },
      {
        key: 'pie',
        path: '/barChart/pie',
        title: '饼图',
        iconf: '&#xe68b;'
      },
      {
        key: 'radar',
        path: '/barChart/radar',
        title: '雷达图',
        iconf: '&#xe68b;'
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
      iconf: '&#xe606;'
    },
    {
      key: 'receiving',
      path: '/mail/receiving',
      title: '收信',
      iconf: '&#xe60f;'
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
    key: 'team',
    path: '/team',
    title: {
      icon: 'team',
      span: 'team'
    },
    component: PicturesWall
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
export const setRouter = (
  <Switch>
    {
      routes.map((router,key) => {
        if (router.exact) {
          return  <Route exact key={key} path={router.path} component={router.component} />;
        } else {
          if (router.childrens) {
            return  <Route  key={key} path={`${router.path}/:id`} component={router.component} />;
          }
          return  <Route  key={key} path={router.path} component={router.component} />;
        }
      })
    }
    <Route component={NoMatch} />
  </Switch>
);