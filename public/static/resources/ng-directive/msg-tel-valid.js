
(function() {
	/**
	 * bootstrap 手机短信、语音插件初始化
	 * params : 
	 * 		data-msgurl    手机短信验证码url
	 * 		data-telurl		语音验证码url
	 * 		data-verifycode	图片验证码（不需要则不传递参数）
	 */
	angular.module("lx.phoen.msg.tel", []).directive('lxMsgTel', function($http,$interval,$timeout) {
		return {
			scope : {
				msgUrl : "@msgurl",
				telUrl : "@telurl",
				verifycode : "@verifycode",
				phone : "@phone",
				error : "@error"
			},
			template : '<button ng-if="msgUrl" ng-disabled="validBtnDisabled" ng-click="$opt.sendMsgValidCode()" class="phone-msg" ng-bind="msgBtnHtml">短信</button>'
				+'<button ng-if="telUrl" ng-disabled="validBtnDisabled" ng-click="$opt.sendTelValidCode()" class="phone-tel" ng-bind="telBtnHtml">语音</button>',
			link: function(scope, element, attrs) {
				scope.msgBtnHtml = "短信";
				scope.telBtnHtml = "语音";
				scope.validBtnDisabled = false;
				
				scope.$opt = $opt = {};
				$opt.sendMsgValidCode = function(){
					$opt.sendValidCode(scope,element,scope.msgUrl);
				}
				$opt.sendTelValidCode = function(){
					$opt.sendValidCode(scope,element,scope.telUrl);
				}
				$opt.sendValidCode = function(scope,element,url,phone,verifycode){
					var index = 119;
					scope.validBtnDisabled = true;
					
					$http({
						url : url,
						method : "get",
						params : {
							"phone" : scope.phone,
							"verifycode" : scope.verifycode
						}
					}).success(function(data){
						if(data.error){
							angular.element(element).parents("form").find(".form-error").empty().append(data.error);
							scope.validBtnDisabled = false;
						}else{
							$interval(function() {
								scope.msgBtnHtml = index;
								if(index <= 0){
									scope.msgBtnHtml = "短信";
									scope.validBtnDisabled = false;
									return;
								}
								index--;
							}, 1000, 120);
						}
					})
				}
			}
		}
	});
})();