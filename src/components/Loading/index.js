import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import '@/styles/comms.less';
function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div className="Loading"><Spin size="large" /></div>;
  } else {
    return null;
  } 
}
const LoadableComponent = Loadable({
  // loader: () => import('@/components/Layout-HashRouter.js'),
  loader: () => import('@/components/Layout-BrowserRouter.js'),
  loading: Loading,
  delay: 300
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}