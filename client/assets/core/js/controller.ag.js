(function () {
	angular
		.module('app.core')
		.controller('loginCtrl', ['$scope', 'User', 'Restangular',
			function ($scope, User, Restangular) {
			$scope.user = {email: 'test@a.com', passwd: '1', passwd2: '1', rem_me: false};
			$scope.loading = false;
			$scope.is_not_logged_in = false;
			$scope.is_logged_in = false;
			$scope.logout_word = '登出';

			$('.login-box a').fancybox();

			$scope.$on('login_success', function (e, user) {
				$scope.is_not_logged_in = false;
				$scope.is_logged_in = true;
				$scope.user = user;
				$.fancybox.close();
			});

			$scope.$on('login_fail', function (e, msg) {
				$scope.login_error = msg;
				$scope.loading = false;
			});

			$scope.$on('reg_succ', function (e) {
				$scope.reg_succ = true;		
			});

			$scope.$on('reg_fail', function (e, msg) {
				$scope.reg_error = msg;
				$scope.loading = false;
			});

			$scope.$on('check_login_fail', function (e) {
				$scope.is_not_logged_in = true;
			});

			$scope.$on('logout', function (e) {
				window.location='/';
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

			$scope.logout = function () {
				$scope.logout_word = '登出中...';
				User.logout()
			}
		}]);
})();