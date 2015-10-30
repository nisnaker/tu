(function () {
	var tu = angular.module('tu', ['ngRoute']);

	tu.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

		$locationProvider.html5Mode(true).hashPrefix('!');

		$routeProvider
			.when('/', {
				templateUrl: '/tpls/home.html',
				controller: 'HomeCtrl'
			})
			.when('/list', {
				templateUrl: '/tpls/list.html',
				controller: 'RouteListCtrl'
			})
			.when('/list/:id', {
				templateUrl: 'tpls/detail.html',
				controller: 'RouteDetailCtrl'
			})
			.otherwise({
				redirectTo: '/list'
			});
	}]);

	tu.controller('HomeCtrl', function () {
		console.log('home')
	});

	tu.controller('RouteListCtrl', ['$scope', function ($scope) {
		console.log(2)
	}]);

	tu.controller('RouteDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
		$scope.id = $routeParams.id;
	}]);
})();