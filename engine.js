var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
module.exports = {
	init: function(app) {
		app.engine('html', function(filePath, options, callback) { // 定义模板引擎
			fs.readFile(filePath, function(err, content) {
				if (err) return callback(new Error(err));
				//自定义get或post请求，获取options
				var rendered = ejs.render(content.toString(), options);
				return callback(null, rendered);
			})
		});
		app.set('views', path.join(__dirname, 'views')); // 指定视图所在的位置
		app.set('view engine', 'html'); // 注册模板引擎
	}
}