(function () {
	'use strict';

	var movie = angular.module('jietu8', ['app.core']);

	movie.config(['$routeProvider', function ($routeProvider) {

	}]);

	movie.run(['$rootScope', function ($rootScope) {
		$rootScope.page = {
			title: '电影截图',
			name: 'movie'
		};
	}]);

})();