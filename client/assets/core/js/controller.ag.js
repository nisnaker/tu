(function () {
	
	angular
		.module('app.core')
		.controller('loginCtrl', ['$scope', '$rootScope', 'User',
			function ($scope, $rootScope, User) {
			l(User)
			$scope.user = {email: '', passwd: '', passwd2: ''};

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
				l('reg')
			}

			$scope.login = function () {
				if(!$scope.check_btn('login'))
					return;
				l('login')
			}
		}]);
})();