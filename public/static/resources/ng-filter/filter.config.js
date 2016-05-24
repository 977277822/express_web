/**
 * 自定义过滤器
 */
(function(){
	angular.module("lx-filter",["lx.money.filter"]);

	angular.module("lx.money.filter", []).filter("moneyConvert",function(){
		return function(input){
			if(!input){
				return 0 + "元";
			}
			var out = input / 100;
			if(out < 10000){
				return out + "元";
			}else if(out >= 10000){
				return out / 10000 + "万元";
			}
			return input;
        }
	});
})();

