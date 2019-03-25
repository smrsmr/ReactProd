import Mock from 'mockjs'; // 引入mockjs
 
// eslint-disable-next-line prefer-destructuring
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据
 
const data = []; // 用于接受生成数据的数组
// eslint-disable-next-line no-unused-vars
const size = [
  '300x250', '250x250', '240x400', '336x280', 
  '180x150', '720x300', '468x60', '234x60', 
  '88x31', '120x90', '120x60', '120x240', 
  '125x125', '728x90', '160x600', '120x600', 
  '300x600'
]; // 定义随机值

for(let i = 0; i < 1500; i ++) { // 可自定义生成的个数
  const template = {
    'key': i,
    //'Boolean': Random.boolean, // 可以生成基本数据类型
    //'Natural': Random.natural(1, 10), // 生成1到100之间自然数
    //'Integer': Random.integer(1, 100), // 生成1到100之间的整数
    //'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    //'Character': Random.character(), // 生成随机字符串,可加参数定义规则
    //'String': Random.string('*',2, 10), // 生成2到10个字符之间的字符串
    //'Range': Random.range(0, 10, 2), // 生成一个随机数组
    //'Cparagraph': Random.cparagraph(), // 生成一段随机文本
    'date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
    //'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
    //'Color': Random.color(), // 生成一个颜色随机值
    //'Paragraph':Random.paragraph(2, 5), //生成2至5个句子的文本
    'name': Random.name(), // 生成姓名
    'url': Random.url(), // 生成web地址
    'address': Random.province(), // 生成地址
    'phone': /(13[0-9]|14[0145689]|15[0-9]|16[2567]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/   //生成符合规制的手机号码
  };
  data.push(template);
}
 
Mock.mock('/data/index', 'get', data); // 根据数据模板生成模拟数据

//生成图表数据
const chartData = {
  'Xdata': ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '足球鞋'],
  'Sdata': [15, 20, 36, 10, 10, 30]
};
Mock.mock('/data/getchart', 'post', chartData); // 根据数据模板生成模拟数据