/**
 * 表单验证自定义命令
 * author : zxb
 * datetime : 2016.3.2
 */
(function() {
	/**
	 * 表单输入控件移入移出样式
	 */
	angular.module("lx.formvalidate", []).directive("lxFormFocus", function($timeout) {
		return {
			restrict: "A",
			require: "ng-model",
			link: function(scope, element, attrs, ctrl) {
				var elem = angular.element(element),
					grountParent = elem.parent();
				var check = function() {
					if (ctrl.$$rawModelValue == undefined || ctrl.$$rawModelValue == "") {
						grountParent.removeClass("on");
					} else {
						grountParent.addClass("on");
					}
				}
				elem.bind('focus', function(evt) {
					grountParent.addClass("on");
				}).bind('blur', function(evt) {
					check();
				}).bind("change", function() {
					check();
				})
			}
		}
	});
})();