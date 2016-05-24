var index = require('./routes/index');
var users = require('./routes/users');

var proxy = require('./proxy');

module.exports = {
	/**
	 * 路由模块配置
	 * @param {Object} app
	 */
	router : function(app){
		app.use('/', routes);
		app.use('/users', users);
		proxy.setProxy(index);
	},
	/**
	 * 渲染引擎配置
	 * @param {Object} engine
	 */
	ejs : function(engine){
	}
}