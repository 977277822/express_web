(function() {

/**
*  Module
*
* Description
*/
	var app = window.pcApp = angular.module("app", ["lx-directive","lx-filter"]);
	app.baseUrl = "";

	app.run(["$rootScope","$timeout", function($rootScope,$timeout) {
		$rootScope.header = "/static/main/common/header.html";
		$rootScope.footer = "/static/main/common/footer.html";
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			$("title").html(toState.title);
	    });
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$("body").addClass("loading");
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			$("body").removeClass("loading");
		});
	}]);

	/**
	 * http请求全局配置
	 */
	app.config(function($httpProvider) {
		$httpProvider.defaults.transformRequest = function(obj) {
			var str = [];
			for (var p in obj) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
		}
		$httpProvider.defaults.headers.post = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
	});
	/**
	 * 获取当前url参数
	 * return 参数对象
	 */
	app.getRequest = function() {
		var url = location.search; // 获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for ( var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}


	/**
	 * 表单验证全局配置
	 */
	app.config(["w5cValidatorProvider", function(w5cValidatorProvider) {

		// 全局配置
		w5cValidatorProvider.config({
			blurTrig: true,
			showError: true,
			removeError: true

		});
		w5cValidatorProvider.setRules({
			email: {
				required: "邮箱地址不能为空",
				email: "邮箱地址格式不正确"
			},
			pwd: {
				required: "密码不能为空",
				minlength: "密码长度不能小于{minlength}位",
				pattern: "密码格式不正确，只能为数字、字母、下划线"
			},
			newPassword: {
				required: "密码不能为空",
				minlength: "密码长度不能小于{minlength}位",
				pattern: "密码格式不正确，只能为数字、字母、下划线"
			},
			phone: {
				required: "手机号不能为空",
				w5cuniquecheck: "该手机号已存在",
				minlength: "手机号长度不正确"
			},
			validCode: {
				required: "短信验证码不能为空"
			},
			imgValidCode : {
				required: "图片验证码不能为空"
			},
			addressDetail : {
				required: "详细地址不能为空"
			},
			addressName : {
				required: "收件人姓名不能为空"
			},
			repeatPwd : {
				w5crepeat : "两次密码不一致"
			},
			card : {
				required: "身份证号码不能为空",
				customizer : "身份证格式不正确"
			},
			company : {
				required: "公司/机构的名称不能为空"
			},
			title : {
				required: "您的职位不能为空"
			},
			day :{
				required: "日期不能为空"
			},
			summary : {
				required: "机构简介不能为空",
				minlength: "机构简介不能少于50字"
			},
			orgName : {
				required: "机构名称不能为空"
			},
			bankAccountNo : {
				required: "银行卡号不能为空"
			},
			bankCode : {
				required: "请选择银行"
			},
			province : {
				required: "请选择省"
			},
			city : {
				required: "请选择市"
			},
			money:{
				required: "请输入金额",
				pattern: "金额格式不正确"
			}

		});
	}]);
})();