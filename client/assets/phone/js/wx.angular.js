(function () {
	'use strict';

console.log('wx');

	var wx = angular.module('wx', ['ngRoute', 'wxCtrls']);

	wx.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		
		$locationProvider.html5Mode({requireBase: false, enable: true}).hashPrefix('');

		$routeProvider.when('/wx/talk', {
				templateUrl: '/tpls/phone/tpls/wx_talk.html',
				controller: 'wxTalkCtrl'
			}).when('/wx/wallet', {
				templateUrl: '/tpls/phone/tpls/wx_wallet.html',
				controller: 'wxWalletCtrl'
			}).when('/wx/pay', {
				templateUrl: '/tpls/phone/tpls/wx_pay.html',
				controller: 'wxPayCtrl'
			}).otherwise({
				redirectTo: '/wx/talk'
			});
	}]);

	var wxCtrls = angular.module('wxCtrls', []);

	wxCtrls.controller('wxTalkCtrl', function () {
			var p0 = Phone({'id': 'phone'});
			
		}).controller('wxWalletCtrl', function () {
			var p0 = Phone({'id': 'phone'});
		}).controller('wxPayCtrl', function () {
			var p0 = Phone({'id': 'phone'});
		});

	wx.run(['$rootScope', '$location', function ($rootScope, $location) {
		$rootScope.path = $location.path();

		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.path = $location.path();
		})
	}]);
})();