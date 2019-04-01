const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireImageminPlugin = require('react-app-rewire-imagemin-plugin');
module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src')
  };
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = rewireReactHotLoader(config, env);
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true, 
    modifyVars: { '@primary-color': '#1890ff' }  // 默认颜色
  })(config, env);
  config = rewireDefinePlugin(config, env, {
    __DEV__: false
  });
  config = rewireImageminPlugin(config, env, {
    disable: process.env.NODE_ENV !== 'production',
    pngquant: {
      quality: '95-100'
    }
  });
  if (env === 'production') {
    console.log('⚡ Production build with Preact');
    config.devtool = false;  //设置为false 打包之后可以去掉.map文件 
  }
  return config;
};