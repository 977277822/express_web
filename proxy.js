var proxy = require('express-http-proxy');


var getProxy = function(url){
	return proxy(url, {
	    forwardPath: function (req, res) {
	    	var proxyUrl = url + req.baseUrl;
	        return require('url').parse(proxyUrl).path;
	    }
	})
}

module.exports = {
	setProxy : function(app){
		for(var attr in app.forward){
			app.use(attr, getProxy(app.forward[attr]));
		}
		//app.use("/api/*", getProxy());
	}
}
