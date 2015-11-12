(function () {
	'use strict';

	angular
		.module('app.core')
		.config(['$routeProvider', '$locationProvider', '$compileProvider',
			function ($routeProvider, $locationProvider, $compileProvider) {
				$locationProvider.html5Mode({requireBase: false, enable: true}).hashPrefix('');

				// 让a标签的href支持data格式
				$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
			}])
		.run(['$rootScope', '$location', function ($rootScope, $location) {
			$rootScope.path = $location.path();

			$rootScope.$on('$routeChangeSuccess', function () {
				$rootScope.path = $location.path();
			});
		}]);
	
})();