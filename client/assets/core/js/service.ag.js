// User

(function () {
	angular
		.module('app.core')
		.factory('User', ['Rest', '$rootScope', function (Rest, $rootScope) {
			var is_loggedin = false;
			var user_info = null;

			var service = {
				info: info,
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

				Rest.api('/users/status').get().then(function (user) {
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
				Rest.api('/users').post(new_user).then(function (user) {
					if(user.error) {
						$rootScope.$broadcast('reg_fail', user.error);
					} else {
						$rootScope.$broadcast('reg_succ', '');
					}
				});
			}

			function login (user) {
				var req = {
					email: user.email,
					passwd: user.passwd,
					rem_me: user.rem_me
				};
				Rest.api('/users/token').post(req).then(function (user) {
					if(user.error) {
						$rootScope.$broadcast('login_fail', user.error);
					} else {
						$rootScope.$broadcast('login_success', user);
					}
				});
			}

			function logout () {
				Rest.api('/users/logout').get().then(function (user) {
					$rootScope.$broadcast('logout');
				});
			}

			function info() {
				return user_info;
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

// HTTP
(function () {
	angular
		.module('app.core')
		.provider('Rest', function () {
			
			var Resource = function (uri, $http, $q) {
				var headers = {"X-Requested-With": "XMLHttpRequest"};

				var baseurl = 'http://tu.me/api',
					uri = ('/' + uri).replace('//', '/'),
					url = baseurl + uri;

				var methods = ['get', 'post', 'head', 'put', 'delete'];
				for(var i in methods) {
					var mt = methods[i];
					this[mt] = httpmaker(mt.toUpperCase());
				}
				function httpmaker (method) {
					return function (params) {
						var req = {
							method: method,
							url: url,
							headers: headers,
							data: params || {}
						};

						var def = $q.defer();

						$http(req)
							.success(function (data, status, headers, config) {
								def.resolve(data);
							})
							.error(function (data, status, headers, config) {
								def.reject('refer rejected.')
							});

						return def.promise;
					}
				}
			}


			this.$get = ['$http', '$q', function ($http, $q) {
				return {api: function (uri) {
					return new Resource(uri, $http, $q);
				}};
			}]
		});
})();