/**
 * 分页指令
 */
(function() {
	angular.module("lx.pagination", []).directive('lxPagination', function($parse) {
		//计算页码
		var getPage = function(counter){
			if(!counter) return;
			var pageCount = counter.pageCount;
			var pageIndex = counter.pageIndex;
			var size = 9;
			var pageUp = true;
			var pageDown = true;
			var pageList = [];
			
			
			// 判断总页码少于9，则页面显示全部页码 【 1 - 9】
			if(pageCount <=9){
				if(pageCount == 1) return;
				for(var i = 0 ; i < pageCount ; i++){
					pageList.push(i + 1);
				}
			}
			//其他页码则显示当前页码到总页码之间9个页码
			else{
				var index = pageIndex - 4;
				var lastIndex = pageIndex + 4
				
				if(index <= 0 && lastIndex <= pageCount){
					index = pageIndex;
					if(pageIndex + 9 >= pageCount){
						lastIndex = pageCount;
					}else{
						lastIndex = index + 8;
					}
				}else if(lastIndex >= pageCount){
					index = pageCount - 8;
					lastIndex = pageCount;
				}
				
				if(pageIndex <= 5){
					index = 1;
					lastIndex = 9;
				}
				
				for(var i = index ; i <= lastIndex ; i++){
					pageList.push(i);
				}
			}
			
			//处理边界
			if(pageIndex == 1) pageUp = false;
			if(pageIndex == pageCount) pageDown = false;
			if(pageCount == 0){
				pageUp = false;
				pageDown = false;
			}
			counter.pageUp = pageUp;
			counter.pageDown = pageDown;
			counter.pageList = pageList;
			return counter;
		};
		//刷新页码
		var refreshCounter = function(scope,counter){
			scope.$lxPager = getPage(counter);
		}
		return {
			template : '<div class="paging" ng-cloak><div class="previous-page" ng-click="$page.pageUp()" ng-if="$lxPager.pageUp"><em><</em>上一页</div><span><a ng-class="{\'active\' : $lxPager.pageIndex == item}" ng-click="$page.changePage(item)" ng-repeat = "item in $lxPager.pageList" ng-bind="item"></a></span><div class="next-page" ng-click="$page.pageDown()" ng-if="$lxPager.pageDown">下一页<em>></em></div></div>',
			link: function(scope, element, attrs) {
				var counter = attrs["lxCounter"],
				refresh = attrs["lxRefresh"],
				modelGetter = $parse(counter),
				counter = modelGetter(scope),refresh = $parse(refresh)(scope);
				scope.$page = page = {};
				scope.$refreshCounter = refreshCounter;
				//刷新翻页组件
				refreshCounter(scope,counter);
				
				//上一页
				page.pageUp = function(){
					refresh(scope.$lxPager.pageIndex - 1,counter);
				}
				
				//选中页
				page.changePage = function(pageIndex){
					refresh(pageIndex,counter);
				}
				//下一页
				page.pageDown = function(){
					refresh(scope.$lxPager.pageIndex + 1,counter);
				}
			}
		}
	})
})();
