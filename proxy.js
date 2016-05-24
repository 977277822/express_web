var proxy = require('express-http-proxy');
var apiUrl = "master.sp.i-db.cn";

var apiProxy = proxy(apiUrl, {
    forwardPath: function (req, res) {
    	var url = req.protocol + "://" + apiUrl + req.baseUrl;
        return require('url').parse(url).path;
    }
});


module.exports = {
	setProxy : function(app){
		app.use("/api/*", apiProxy);
	}
}
