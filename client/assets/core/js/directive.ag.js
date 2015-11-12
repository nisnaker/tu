(function () {
	'use strict';

	// 选择文件
	angular
		.module('app.core')
		.directive('myFileSelect', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var attrHandler = $parse(attrs.myFileSelect);
				var handler = function (e) {
					attrHandler(scope, {$event:e, files: e.target.files});
					this.value = ''; // 清除input内容
				}
				element.on('change', handler);
			}
		};
	}]);
})();