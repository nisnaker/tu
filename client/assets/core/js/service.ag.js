// User

(function () {
	'use strict';

	angular
		.module('app.core')
		.factory('User', ['$http', '$q', '$rootScope',
			function ($http, $q, $rootScope) {
				var _is_logged_in = false;
				var _user_info = null;

				var service = {
					is_logged_in: _is_logged_in,
					login: login,
					logout: logout,
					info: info,
				};

				return service;

				function login (username, passwd) {
					var req = {
						username: username,
						passwd: passwd
					};

					return $http.post('/user/login', req)
						.then(_success)
						.catch(_error);

					function _success (resp) {
						
					}
				}

				function logout () {
					return $http.post('/user/logout')
						.then(_success)
						.catch(_error);
				}

				function info () {
					return _user_info;
				}

				function _set_user () {
					
				}

				function _clear_user () {
					
				}
		}]);



})();