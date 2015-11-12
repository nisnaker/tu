(function () {
	
	angular
		.module('app.core')
		.controller('barCtrl', ['$scope', '$rootScope', 'User',
			function ($scope, $rootScope, User) {
			l(User)
		}]);
})();