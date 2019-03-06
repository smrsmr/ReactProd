import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
const echartsOption = {
  title: {
    text: '基础柱状图'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 15]
  }]
};
export class Bar extends Component {
  onChartClick(e) {
    console.log(`${e.name}-销量:${e.data}`);
  }
  render() {
    const onEvents = {
      'click': this.onChartClick
    };
    return (
      <ReactEcharts
        ref={(e) => { this.echartsElement = e; }}
        option={echartsOption}
        style={{height: '400px', width: '100%'}}
        theme="clear"
        onEvents={onEvents}
      />
    );
  }
}

export default Bar;
