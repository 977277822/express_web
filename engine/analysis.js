/**
 * 自定义解析器
 */
var httpSync = require("./deasync");

var requestCode = function(text, options) {
	var leftTag = text.indexOf("(");
	var rightTag = text.indexOf(")");
	var codeName = text.substring(0, leftTag).trim();
	var ctx = text.substring(leftTag + 1, rightTag);
	var pName = ctx.split(",")[0].split("=")[0].trim();
	var pValue = ctx.split(",")[0].split("=")[1].trim();
	var ctxName = ctx.split(",")[1].split("=")[1].trim();
	return {
		pName: codeName,
		pValue: pValue,
		ctxName: ctxName
	};
}

var getRequest = function(text, options, method) {
	var baseUrl = "http://master.sp.i-db.cn";
	var p = requestCode(text, options);
	var baseUrl = baseUrl + p.pValue;
	var returnObj = {};
	returnObj[p.pName] = httpSync(baseUrl, "GET", options)
	return returnObj;
}

var code = {
	post: function(text, options) {
		return getRequest(text, options, "POST");
	},
	get: function(text, options) {
		return getRequest(text, options, "GET");
	}
};

/**
 * 解析 
 * @param {Object} code
 */
var analysis = function(code, options) {
	var codeList = [];
	code.replace(/\<\!\-\-(.*?)\-\-\>/g, function(match, text, i) {
		codeList.push(text);
	});
	codeList.forEach(function(item, index) {
		var data = setcode(item, options);
		console.log(data);
	});

}

var setcode = function(text, options) {
	var leftTag = text.indexOf("(");
	var rightTag = text.indexOf(")");
	var codeName = text.substring(0, leftTag).trim();
	return code[codeName](text, options);
};

module.exports = function(text, options) {
	return analysis(text, options);
};

module.exports("<!-- get(url=/api/equity/me/get,name=user) -->", {
	headers: {}
})