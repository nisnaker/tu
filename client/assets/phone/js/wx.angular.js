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
			header_btr_charging: false,
			header_rotate: true
		},
		talk: {
			wx_bg_img: '',
			wx_talk_unread: 65,
			wx_talk_title: '赵本山',
			avatar_left: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2829529271,2317257416&fm=58',
			avatar_right: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1687009699,2047836833&fm=58'
		},
		wx_wallet: 88.99,
		wx_pay_amount: 99.88
	};

	wxCtrls.controller('wxTalkCtrl', ['$scope', function ($scope) {
			$scope.msgs = [];
			$scope.topbar = default_settings.topbar;
			$scope.talk = default_settings.talk;
			$scope.msg_type = 'time';
			$scope.msg_cnt = '123';

			// 绘制图像
			function _ () {
				Phone(default_settings.topbar).set_talk_content(default_settings.talk, $scope.msgs);
			}

			_();
			$scope.draw = function() {
				_();
			}

			// 新增聊天内容
			$scope.add_msg = function (align) {
				if(! $scope.msg_cnt) return;

				var msg = {
					type: $scope.msg_type,
					content: $scope.msg_cnt
				}

				if('time' != $scope.msg_type)
					msg['align'] = align;

				$scope.msgs.push(msg);
				$scope.msg_cnt = '123';
				_();
			}

			// 翻译
			$scope.t = function (type) {
				return {
					'time': '时间/提示框',
					'text': '文本',
					'voice': '语音',
					'video': '视频',
					'pay_send': '转账',
					'pay_rec': '收钱'
				}[type]
			}

			// 删除一条聊天内容
			$scope.rm = function(index) {
				$scope.msgs.splice(index, 1);
				_();
			}

			// 设置聊天背景
			$scope.set_bg = function (obj) {
				var files = obj.files;
				if(0 == files.length) return;

				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				reader.onload = function (e) {
					$scope.talk.wx_bg_img = this.result;
					_();
				}
				obj.outerHTML = obj.outerHTML; // 清除input内容
			}

			// 移除聊天背景
			$scope.rm_bg = function () {
				$scope.talk.wx_bg_img = '';
				_();
			}

			// 随机头像
			$scope.set_avatar = function (align) {
				var l = info.avatars.length,
					index = parseInt(Math.random() * l),
					avatar = 'http://tp2.sinaimg.cn/574'+info.avatars[index]+'/180/0';

				$scope.talk['avatar_' + align] = avatar;
				_();
			}

			// 随机昵称
			$scope.set_name = function () {
				var l = info.names.length,
					index = parseInt(Math.random() * l),
					name = info.names[index];
				$scope.talk.wx_talk_title = name;
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