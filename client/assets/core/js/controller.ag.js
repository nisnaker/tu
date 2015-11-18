(function () {
	
	angular
		.module('app.core')
		.controller('loginCtrl', ['$scope', '$rootScope', 'User', 'Restangular',
			function ($scope, $rootScope, User, Restangular) {
			$scope.user = {email: 'test@a.com', passwd: '1', passwd2: '1', rem_me: false};
			$scope.loading = false;

			$('.login-box a').fancybox();

			$rootScope.$on('login_success', function (e, user) {
				$scope.is_logged_in = true;
				$scope.user = user;
				$.fancybox.close();
			});

			$rootScope.$on('login_fail', function (e, msg) {
				$scope.login_error = msg;
				$scope.loading = false;
			});

			$rootScope.$on('reg_succ', function (e) {
				$scope.reg_succ = true;		
			});

			$rootScope.$on('reg_fail', function (e, msg) {
				$scope.reg_error = msg;
				$scope.loading = false;
			});

			User.check_login();

			// 检测email格式
			$scope.check_email = function () {
				return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($scope.user.email);
			}

			// 按钮状态
			$scope.check_btn = function (btn) {
				if('reg' == btn)
					return !$scope.loading && $scope.user.email && $scope.user.passwd && $scope.user.passwd == $scope.user.passwd2 && $scope.check_email();
				else if ('login' == btn)
					return !$scope.loading && $scope.user.email && $scope.user.passwd && $scope.check_email();
			}

			$scope.reg = function () {
				if(!$scope.check_btn('reg')) return;
				
				$scope.loading = true;
				User.reg($scope.user);
			}

			$scope.login = function () {
				if(!$scope.check_btn('login')) return;

				$scope.loading = true;
				User.login($scope.user);
			}
		}]);
})();