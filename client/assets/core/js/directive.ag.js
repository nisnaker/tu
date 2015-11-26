(function () {
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
		}]).directive('myReturnPress', function () {
			return function (scope, element, attrs) {
				element.bind('keydown keypress', function (e) {
					if(13 == e.which) {
						scope.$apply(function () {
							scope.$eval(attrs.myReturnPress)
						})

						e.preventDefault();
					}
				})
			}
		});
})();