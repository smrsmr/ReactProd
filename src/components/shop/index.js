import React, { Component } from 'react';
import { Button, message } from 'antd';
const ws = new WebSocket('ws://127.0.0.1:8080/websocket');
// const heartbeat_timer = null;
export default class index extends Component {
  componentDidMount() {
	  // const _this = this;
	  ws.onopen = function () {
	    console.log('ws onopen');
	    // 开启心跳检测，以免一段时间后收不到消息自动失联
	    /* heartbeat_timer = setInterval(function () {
        _this.keepalive(ws);
      }, 5000); */
	    //发送给服务端
	    ws.send('from client: hello'); 
	  };
	  ws.onmessage = function (e) {
	    console.log('ws onmessage');
	    console.log(e.data);
	  };
	  ws.onclose = function () {
	    // clearInterval(heartbeat_timer);
	    console.log('ws close');
	  };
  }
	keepalive = () => {
	  const { value } = this.values;
	  if (value === '') {
	    message.warning('请不要发送空消息!!!');
	    return;
	  }
	  ws.send(`react: ${value}`);
	}
	render() {
	  return (
	    <div>
	      <h1>shop</h1>
	      <br />
	      <input type="text" ref={(e)=>this.values = e}  />
	      <Button type="primary" onClick={this.keepalive}>发送消息</Button>
	    </div>
	  );
	}
}
