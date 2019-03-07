/**
 * router 配置文件
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//utils
import Bundle from '@/utils/Bundle.js';
//404组件
import NoMatch from '@/components/404/NoMatch';

const User = (props) => (<Bundle load={() => import('@/components/user/User')}>{(User) => <User {...props}/>}</Bundle>);
const PicturesWall = (props) => (<Bundle load={() => import('@/components/PicturesWall/PicturesWall')}>{(PicturesWall) => <PicturesWall {...props}/>}</Bundle>);
const BarChart = (props) => (<Bundle load={() => import('@/components/barChart/index')}>{(BarChart) => <BarChart {...props}/>}</Bundle>);
const Mail = (props) => (<Bundle load={() => import('@/components/mail/index')}>{(Mail) => <Mail {...props}/>}</Bundle>);
export const routes = [
  {
    key: 'home',
    path: '/',
    exact: 'exact',
    component: require('@/components/home/Home').default
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
    key: 'cloudO',
    path: '/cloudO',
    title: {
      icon: 'cloud-o',
      span: 'cloudO'
    },
    component: PicturesWall
  },
  {
    key: 'appstoreO',
    path: '/appstoreO',
    title: {
      icon: 'appstore-o',
      span: 'appstoreO'
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