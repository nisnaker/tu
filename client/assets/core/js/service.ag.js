// User

(function () {
	angular
		.module('app.core')
		.factory('User', ['Restangular', '$rootScope', function (Restangular, $rootScope) {
			var is_loggedin = false;
			var user_info = null;

			var service = {
				is_loggedin: is_loggedin,
				reg: reg,
				login: login,
				logout: logout,
				check_login: check_login
			};

			return service;

			function check_login () {
				if(is_loggedin)
					return true;

				Restangular.oneUrl('/user/status').get().then(function (user) {
					if(user.email) {
						is_loggedin = true;
						_set_user(user);
						$rootScope.$broadcast('login_success', user);
					} else {
						$rootScope.$broadcast('check_login_fail', '');
						_clear_user();
					}
				});
			}

			function reg (user) {
				var new_user = {
					email: user.email,
					passwd: user.passwd
				};
				Restangular.all('users').post(new_user).then(function (user) {
					if(user.error) {
						$rootScope.$broadcast('reg_fail', user.error);
					} else {
						$rootScope.$broadcast('reg_succ', '');
					}
				});
			}

			function login (user) {
				var new_token = {
					email: user.email,
					passwd: user.passwd,
					rem_me: user.rem_me
				};
				Restangular.all('token').post(new_token).then(function (user) {
					if(user.error) {
						$rootScope.$broadcast('login_fail', user.error);
					} else {
						$rootScope.$broadcast('login_success', user);
					}
				});
			}

			function logout () {
				Restangular.oneUrl('/user/logout').get().then(function (user) {
					$rootScope.$broadcast('logout');
				});
				
			}

			function _set_user(user) {
				is_loggedin = true;
				user_info = user;
			}

			function _clear_user() {
				is_loggedin = false;
				user_info = null;
			}
		}]);
})();