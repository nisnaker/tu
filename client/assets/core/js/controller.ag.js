(function () {
	
	angular
		.module('app.core')
		.controller('loginCtrl', ['$scope', '$rootScope', 'User',
			function ($scope, $rootScope, User) {
			l(User)
			$scope.user = {email: '', passwd: '', passwd2: ''};

			$('.login-box a').fancybox();
		}]);
})();