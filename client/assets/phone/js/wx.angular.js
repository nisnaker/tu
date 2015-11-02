(function () {
	'use strict';

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

	var default_settings = {
		id: 'phone',
		topbar: {
			header_signal: '3',
			header_carrier: '中国移动',
			header_network: 'WiFi',
			header_time: '12:34',
			header_btr: '80',
			header_btr_show_percent: true,
			header_btr_charging: false
		},
		talk: {
			wx_talk_unread: 65,
			wx_talk_title: '赵本山'
		},
		wx_wallet: 88.99,
		wx_pay_amount: 99.88
	};

	wxCtrls.controller('wxTalkCtrl', ['$scope', function ($scope) {
			var msgs = [];
			$scope.topbar = default_settings.topbar;
			$scope.talk = default_settings.talk;

			function _ () {
				Phone(default_settings.topbar).set_talk_content(default_settings.talk, []);
			}

			_();
			$scope.draw = function() {
				_();
			}
			
		}]).controller('wxWalletCtrl', ['$scope', function ($scope) {
			$scope.topbar = default_settings.topbar;
			$scope.wx_wallet = default_settings.wx_wallet;

			function _ () {
				var money = $scope.wx_wallet;
				default_settings.wx_wallet = money;
				Phone(default_settings.topbar).set_wallet_page({wx_wallet: money});
			}

			_();
			$scope.draw = function() {
				_();
			}
		}]).controller('wxPayCtrl', ['$scope', function ($scope) {
			$scope.topbar = default_settings.topbar;
			$scope.wx_pay_amount = default_settings.wx_pay_amount;

			function _(){
				var money = $scope.wx_pay_amount;
				default_settings.wx_pay_amount = money;
				Phone(default_settings.topbar).set_pay_page({wx_pay_amount: money});
			}

			_();
			$scope.draw = function() {
				_();
			}
		}]);

	wx.run(['$rootScope', '$location', function ($rootScope, $location) {
		$rootScope.path = $location.path();

		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.path = $location.path();
		})
	}]);
})();