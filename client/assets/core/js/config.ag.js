(function () {
	angular
		.module('app.core')
		.config(['$routeProvider', '$locationProvider', '$compileProvider', '$httpProvider', '$filterProvider',
			function ($routeProvider, $locationProvider, $compileProvider, $httpProvider, $filterProvider) {
				$locationProvider.html5Mode({requireBase: false, enable: true}).hashPrefix('');

				// 让a标签的href支持data格式
				$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);

				// 允许跨域访问时带上cookie
				$httpProvider.defaults.withCredentials = true;

				$filterProvider.register('ago', function () {
					return function (time) {
						var t = Math.ceil(((new Date) - new Date(time))/1000);
						if(t < 10)
							return '几秒前';
						if(t < 60)
							return t + '秒前';
						if(t < 3600)
							return Math.floor(t/60)+ '分钟前';
						if(t < 3600 * 24)
							return Math.floor(t/3600)+ '小时前';
						
						return Math.floor(t/3600/24)+ '天前';
					}
				});

			}])
		.run(['$rootScope', '$location', function ($rootScope, $location) {
			$rootScope.path = $location.path();

			$rootScope.$on('$routeChangeSuccess', function () {
				$rootScope.path = $location.path();
			});
		}]);
	
})();