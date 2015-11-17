(function () {
	
	angular
		.module('app.core')
		.controller('loginCtrl', ['$scope', '$rootScope', 'User', 'Restangular',
			function ($scope, $rootScope, User, Restangular) {
			l(User)
			$scope.user = {email: 'test@a.com', passwd: '1', passwd2: '1'};
			$scope.rem_me = false;

			$('.login-box a').fancybox();

			// 检测email格式
			$scope.check_email = function () {
				return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($scope.user.email);
			}

			// 按钮状态
			$scope.check_btn = function (btn) {
				if('reg' == btn)
					return $scope.user.email && $scope.user.passwd && $scope.user.passwd == $scope.user.passwd2 && $scope.check_email();
				else if ('login' == btn)
					return $scope.user.email && $scope.user.passwd && $scope.check_email();
			}

			$scope.reg = function () {
				if(!$scope.check_btn('reg'))
					return;
				
				var user = Restangular.all('users');
				var new_user = {
					email: $scope.user.email,
					passwd: $scope.user.passwd
				};
				user.post(new_user).then(function (posted_user) {
					l(posted_user)
				});
			}

			$scope.login = function () {
				if(!$scope.check_btn('login'))
					return;

				var token = Restangular.all('token');
				var new_token = {
					email: $scope.user.email,
					passwd: $scope.user.passwd,
					rem_me: $scope.rem_me
				};
				token.post(new_token).then(function (token) {
					l(token)
				});
			}
		}]);
})();