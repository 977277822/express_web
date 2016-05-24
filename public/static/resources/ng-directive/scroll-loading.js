/**
 * 元素在滚动条可视区域执行自定义函数 author : zxb datetime : 2016.3.2
 */
(function() {
	angular.module("lx.scrollLazy", []).directive("lxScrollLazy", function($document, $timeout) {
		var scrollLazy = {
			start : function(ele, attrs, scope, loadingFunc) {
				scrollLazy.waitCreateList.push({
					"ele" : ele,
					"attrs" : attrs,
					"loadingFunc" : loadingFunc
				});
				if (scrollLazy.started == true) {
					return;
				}
				var scrollHander = function() {
					var arr = scrollLazy.waitCreateList;
					//检查数组长度为空，接触滚动条事件绑定
					if (arr.length == 0) {
						$document.unbind("scroll", scrollHander);
						return;
					}
					for ( var i = 0; i < arr.length; i++) {
						var self = arr[i];
						scrollLazy.checkElement(self,scope, i);
					}
				};
				scrollLazy.started == true;
				$document.scroll(scrollHander);
				
			},
			checkElement : function(obj,scope, index) {
				/**
				 * x1 = 元素top , y1 = 元素bottom ,x2 = 窗口top ,y2 = 窗口bottom
				 * 
				 * 计算公式
				 * [{ x1 >= x2 && y1 <= y2 }元素在窗口正中央]、
				 * [{ x1 <= x2 && y1 >= x2 } 元素在窗口上方，未全部消失]、 
				 * [{ y1 >= y2 && x1 <= y2 } 元素在窗口下方，未全部消失]
				 */
				var x1 = obj.ele.offset().top;
				var y1 = obj.ele.height() + x1;
				var x2 = $(window).scrollTop();
				var y2 = $(window).height() + x2;

				if ((x1 >= x2 && y1 <= y2) || (x1 <= x2 && y1 >= x2) || (y1 >= y2 && x1 <= y2)) {
					var waitObj = scrollLazy.waitCreateList.splice(index, 1)[0];
					// 页面渲染完成后执行绑定函数
					$timeout(function() {
						// 默认参数：[element : 绑定滚动加载事件的元素对象 , attrs ： 该元素对象属性集]
						scope.$apply(obj.loadingFunc(waitObj.ele, waitObj.attrs));
					}, 10)

				}
			},
			waitCreateList : [],
			started : false
		}

		return {
			restrict : "A",
			link : function(scope, element, attrs) {
				var loadingFunc = scope[attrs.lxScrollLazy];
				if (scrollLazy != null) {
					scrollLazy.start(element, attrs, scope, loadingFunc);
				}
				
				$document.ready(function(){
					$timeout(function(){
						$document.scroll();
					},1)
				})

			}
		}
	})
})();