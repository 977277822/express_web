var routes = require('./routes/index');
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
		app.use('/common', common);
		proxy.setProxy(app);
	},
	/**
	 * 渲染引擎配置
	 * @param {Object} engine
	 */
	ejs : function(engine){
	}
}