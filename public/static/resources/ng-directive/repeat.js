
/**
 *  repeat命令执行完成之后事件
 */
(function() {
	angular.module("lx.repeat", []).directive('repeatFinish', function() {
		return {
			link: function(scope, element, attrs) {
				if (scope.$last == true) {
					scope.$eval(attrs.repeatFinish)();
				}
			}
		}
	})
})();