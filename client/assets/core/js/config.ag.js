(function () {
	'use strict';

	angular
		.module('app.core')
		.config(['$routeProvider', '$locationProvider', '$compileProvider', 'RestangularProvider',
			function ($routeProvider, $locationProvider, $compileProvider, RestangularProvider) {
				$locationProvider.html5Mode({requireBase: false, enable: true}).hashPrefix('');

				// 让a标签的href支持data格式
				$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);


				RestangularProvider.setBaseUrl('/api/');
				RestangularProvider.setRequestSuffix('.json');
				RestangularProvider.setDefaultHeaders({"X-Requested-With":"XMLHttpRequest"});
				RestangularProvider.setRestangularFields({
					id: '_id',
					route: 'restangularRoute',
					selflink: 'self.href'
				});



			}])
		.run(['$rootScope', '$location', function ($rootScope, $location) {
			$rootScope.path = $location.path();

			$rootScope.$on('$routeChangeSuccess', function () {
				$rootScope.path = $location.path();
			});
		}]);
	
})();