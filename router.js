var index = require('./routes/index');
var users = require('./routes/users');

//配置代理
var proxy = require('./proxy');

module.exports = {
	/**
	 * 路由模块配置
	 * @param {Object} app
	 */
	router : function(app){
		app.use('/', index);
		app.use('/users', users);
		proxy.setProxy(app);
	}
}