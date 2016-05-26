/**
 * http请求同步调用
 */
var http = require('http');
var request = require('request')
var deasync = require('deasync');

/**
 * 
 * @param {Object} url
 * @param {Object} method
 * @param {Object} header
 */
var httpSync = function(url, method, header) {
	var status, isReturn = false;
	var options = {
		url: url,
		metohd : method || "GET",
		headers: header || { }
	};

	request(options, function(error, response, body) {
		console.log('http request return!');
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			isReturn = true;
			status = info;
		}
	});
	
	while (!isReturn) {
		deasync.runLoopOnce();
	}

	return status;
}

module.exports = httpSync;

//var reqUrl = 'http://master.sp.i-db.cn/api/equity/me/get';
//console.log('begin to request: %s', reqUrl);
//var startTime = new Date().getTime();
//console.log( httpSync(reqUrl));
//endTime = new Date().getTime();
//console.log(endTime - startTime);
//console.log("----------------------------------------------------");
