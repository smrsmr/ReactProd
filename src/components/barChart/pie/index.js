import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
const colorArr = ['#1890ff', '#2fc25b', '#facc14', '#223273', '#8543e0', '#13c2c2', '#3436c7', '#f04864'];
const echartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data:['天海湾','鼎龙湾','珍珠湾','翠逸家园','紫林湾'] //需要对应 series 的 name值
  },
  color: colorArr,
  series: [
    {
      name:'访问来源',
      type:'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '20',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[ //由于颜色的原因，这里应该对数据做一下排序~
        {value:1548, name:'天海湾'},
        {value:510, name:'鼎龙湾'},
        {value:338, name:'珍珠湾'},
        {value:265, name:'翠逸家园'},
        {value:220, name:'紫林湾'}
      ]
    }
  ]
};
export class Pie extends Component {
  render() {
    return (
      <ReactEcharts
        ref={(e) => { this.echartsElement = e; }}
        option={echartsOption}
        theme="clear"
      />
    );
  }
}

export default Pie;
