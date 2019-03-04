import React from 'react';
import Loadable from 'react-loadable';
function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading......</div>;
  } else {
    return null;
  }
}
const LoadableComponent = Loadable({
  loader: () => import('@/components/Layout.js'),
  loading: Loading,
  delay: 300
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}