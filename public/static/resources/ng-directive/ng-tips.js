
(function() {
	/**
	 * bootstrap tips插件初始化
	 */
	angular.module("lx.tips", []).directive('lxTips', function($parse) {
		return {
			link: function(scope, element, attrs) {
				var title = attrs["title"],getter = $parse(title);
				angular.element(element).attr("title",getter(scope)).tooltip();
			}
		}
	});
	/**
	 * bootstrap popover插件初始化
	 */
	angular.module("lx.popover", []).directive('lxPopover', function($parse) {
		return {
			link: function(scope, element, attrs) {
				angular.element(element).popover({
					"trigger" : "hover",
					"placement" : "bottom"
				})
			}
		}
	});
})();