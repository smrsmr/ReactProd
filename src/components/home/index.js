import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
//要引入扩展不然会报错
import 'echarts/extension/bmap/bmap';
import '@/styles/comms.less';
export default class index extends Component {
  constructor(props){
    super(props);
    this.myChart = null;
    this.throttle = this.throttle.bind(this);
    this.resize = this.resize.bind(this);
  }
  componentDidMount() {
	  // 基于准备好的dom，初始化echarts实例
	  this.myChart = echarts.init(document.getElementById('main'));
	  //lines-bus.json 为官方https://echarts.baidu.com/examples/data/asset/data/lines-bus.json 数据 保存到本地即可
	  //fetch 访问json文件路径这里有个坑 我们需要把lines-bus.json 文件放到public文件夹 即和index.html 同一目录
    this.myChart.showLoading({
      text: 'loading',
      color: '#4cbbff',
      textColor: '#4cbbff',
      maskColor: 'rgba(0, 0, 0, 0.9'
    });
	  fetch('./lines-bus.json').then(res => {
	    return res.json();
    }).then(data => {
      this.myChart.hideLoading();
	    const hStep = 300 / (data.length - 1);
	    const busLines = [].concat.apply([], data.map(function (busLine, idx) {
	      let prevPt;
	      const points = [];
	      for (let i = 0; i < busLine.length; i += 2) {
	        let pt = [busLine[i], busLine[i + 1]];
	        if (i > 0) {
	          pt = [
	            prevPt[0] + pt[0],
	            prevPt[1] + pt[1]
	          ];
	        }
	        prevPt = pt;

	        points.push([pt[0] / 1e4, pt[1] / 1e4]);
	      }
	      return {
	        coords: points,
	        lineStyle: {
	          normal: {
	            color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
	          }
	        }
	      };
	    }));
	    this.myChart.setOption({
	      bmap: {
	        center: [116.46, 39.92],
	        zoom: 11,
	        roam: true,
	        mapStyle: {
	          'styleJson': [
	            {
	              'featureType': 'water',
	              'elementType': 'all',
	              'stylers': {
	                'color': '#031628'
	              }
	            },
	            {
	              'featureType': 'land',
	              'elementType': 'geometry',
	              'stylers': {
	                'color': '#000102'
	              }
	            },
	            {
	              'featureType': 'highway',
	              'elementType': 'all',
	              'stylers': {
	                'visibility': 'off'
	              }
	            },
	            {
	              'featureType': 'arterial',
	              'elementType': 'geometry.fill',
	              'stylers': {
	                'color': '#000000'
	              }
	            },
	            {
	              'featureType': 'arterial',
	              'elementType': 'geometry.stroke',
	              'stylers': {
	                'color': '#0b3d51'
	              }
	            },
	            {
	              'featureType': 'local',
	              'elementType': 'geometry',
	              'stylers': {
	                'color': '#000000'
	              }
	            },
	            {
	              'featureType': 'railway',
	              'elementType': 'geometry.fill',
	              'stylers': {
	                'color': '#000000'
	              }
	            },
	            {
	              'featureType': 'railway',
	              'elementType': 'geometry.stroke',
	              'stylers': {
	                'color': '#08304b'
	              }
	            },
	            {
	              'featureType': 'subway',
	              'elementType': 'geometry',
	              'stylers': {
	                'lightness': -70
	              }
	            },
	            {
	              'featureType': 'building',
	              'elementType': 'geometry.fill',
	              'stylers': {
	                'color': '#000000'
	              }
	            },
	            {
	              'featureType': 'all',
	              'elementType': 'labels.text.fill',
	              'stylers': {
	                'color': '#857f7f'
	              }
	            },
	            {
	              'featureType': 'all',
	              'elementType': 'labels.text.stroke',
	              'stylers': {
	                'color': '#000000'
	              }
	            },
	            {
	              'featureType': 'building',
	              'elementType': 'geometry',
	              'stylers': {
	                'color': '#022338'
	              }
	            },
	            {
	              'featureType': 'green',
	              'elementType': 'geometry',
	              'stylers': {
	                'color': '#062032'
	              }
	            },
	            {
	              'featureType': 'boundary',
	              'elementType': 'all',
	              'stylers': {
	                'color': '#465b6c'
	              }
	            },
	            {
	              'featureType': 'manmade',
	              'elementType': 'all',
	              'stylers': {
	                'color': '#022338'
	              }
	            },
	            {
	              'featureType': 'label',
	              'elementType': 'all',
	              'stylers': {
	                'visibility': 'off'
	              }
	            }
	          ]
	        }
	      },
	      series: [{
	        type: 'lines',
	        coordinateSystem: 'bmap',
	        polyline: true,
	        data: busLines,
	        silent: true,
	        lineStyle: {
	          normal: {
	            // color: '#c23531',
	            // color: 'rgb(200, 35, 45)',
	            opacity: 0.2,
	            width: 1
	          }
	        },
	        progressiveThreshold: 500,
	        progressive: 200
	      }, {
	        type: 'lines',
	        coordinateSystem: 'bmap',
	        polyline: true,
	        data: busLines,
	        lineStyle: {
	          normal: {
	            width: 0
	          }
	        },
	        effect: {
	          constantSpeed: 20,
	          show: true,
	          trailLength: 0.1,
	          symbolSize: 1.5
	        },
	        zlevel: 1
	      }]
	    });
    });
    window.addEventListener('resize',this.resize);
  }
  componentWillUnmount() {
    this.myChart.dispose();
    window.removeEventListener('resize',this.resize);
  }
	//echarts 屏幕大小自适应
	resize = () => {
	  this.myChart.resize();
	};
	//节流函数 高频函数在一定时间内只执行一次 可以稀释函数执行频率
	throttle = (fn) => {
	  let isBreak = true;
	  return function(){
	    if (!isBreak) return;
	    isBreak = false;
	    setTimeout(() => {
	      fn.call(this, arguments);
	      isBreak = true;
	    },500);
	  };
	}
	render() {
	  return (
		  <div id="main" style={{ width: '100%', height: '90%' }}></div>
	  );
	}
}
