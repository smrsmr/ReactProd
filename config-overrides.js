const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
  config.resolve.alias = {
    '@': resolve('src')
	}
	config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
	config = rewireLess.withLoaderOptions({
		javascriptEnabled: true, //解决antd less错误
		// modifyVars: { "@primary-color": "#1DA57A" },
	})(config, env);
	config = rewireDefinePlugin(config, env, {
			__DEV__: false
	});
  return config;
}