(function () {
	'use strict';

	var wx = angular.module('wx', ['ngRoute', 'wxCtrls']);

	wx.config(['$routeProvider', '$locationProvider', '$compileProvider', function ($routeProvider, $locationProvider, $compileProvider) {
		
		$locationProvider.html5Mode({requireBase: false, enable: true}).hashPrefix('');
		// $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);

		$routeProvider.when('/wx/talk', {
				templateUrl: '/tpls/phone/tpls/wx_talk.html',
				controller: 'wxTalkCtrl'
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
			// avatar_left: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2829529271,2317257416&fm=58',
			// avatar_right: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1687009699,2047836833&fm=58'
			avatar_left: 'http://img5.imgtn.bdimg.com/it/u=3205921481,3084094672&fm=23&gp=0.jpg',
			avatar_right: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg'
		},
		wx_wallet: 88.99,
		wx_pay_amount: 99.88
	};

	// 选择文件
	wx.directive('myFileSelect', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var attrHandler = $parse(attrs.myFileSelect);
				var handler = function (e) {
					attrHandler(scope, {$event:e, files: e.target.files});
					this.value = ''; // 清除input内容
				}
				element.on('change', handler);
			}
		};
	}]);

	function now (format, ts) {
		ts = ts || (new Date) * 1;
		
		var spool = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
		var D = new Date(ts), d = {};

		d['Y'] = D.getFullYear();
		d['M'] = D.getMonth() + 1;
		d['D'] = D.getDate();
		d['H'] = D.getHours();
		d['I'] = D.getMinutes();
		d['S'] = D.getSeconds();

		var ret = format;
		for(var i in d) {
			var v = d[i];
			v = spool[v] || v;
			ret = ret.replace(i, v);
		}
		return ret;
	}

	wx.run(['$rootScope', '$location', function ($rootScope, $location) {
		$rootScope.path = $location.path();

		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.path = $location.path();
		});

		$rootScope.download = function () {
			var dataurl = this.dataurl.replace('image/png', 'image/octet-stream'),
				filename = '截图吧_' + now('M-D-H-I-S') + '.png',
				savelink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
				savelink.href = dataurl;
				savelink.download = filename;

			savelink.click();
		}

		$rootScope.render = function () {
			return Phone(default_settings.topbar).onload(function (url) {
				$rootScope.dataurl = url;
				$rootScope.$digest();
			});
		}
	}]);

	wxCtrls.controller('wxTalkCtrl', ['$scope', function ($scope) {
			$scope.msgs = [];
			$scope.topbar = default_settings.topbar;
			$scope.talk = default_settings.talk;
			$scope.msg_type = 'text';
			$scope.msg_cnt = '';
			$scope.tab = 2;
			var phone = '';

			// 绘制图像
			function _ () {
				$scope.render().set_talk_content(default_settings.talk, $scope.msgs);
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
				$scope.msg_cnt = '';
				_();
			}

			// 清空聊天记录
			$scope.clear_msg = function () {
				$scope.msgs = [];
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
			$scope.set_bg = function (files) {
				if(0 == files.length) return;

				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				reader.onload = function (e) {
					$scope.talk.wx_bg_img = this.result;
					_();
				}
			}

			// 移除聊天背景
			$scope.rm_bg = function () {
				$scope.talk.wx_bg_img = '';
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

			// 随机头像
			$scope.random_avatar = function (align) {
				var l = info.avatars.length,
					index = parseInt(Math.random() * l),
					avatar = 'http://tp2.sinaimg.cn/574'+info.avatars[index]+'/180/0';
				avatar = 'http://img0.imgtn.bdimg.com/it/u='+info.avatars[index]+'&fm=11&gp=0.jpg';

				$scope.talk['avatar_' + align] = avatar;
				_();
			}

			// 设置头像
			$scope.set_avatar = function (align, files) {
				if(0 == files.length) return;

				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
			
				reader.onload = function (e) {
					default_settings.talk['avatar_' + align] = this.result;
					$scope.$digest(); // 在angular上下文之外更改scope的值，需要强制进入scope检查循环
					_();
				}
			}
		}]).controller('wxPayCtrl', ['$scope', function ($scope) {
			$scope.topbar = default_settings.topbar;
			$scope.type = 'wallet';
			$scope.money = 66.88;
			$scope.time1 = now('Y-M-D H:I:S');
			$scope.time2 = now('Y-M-D H:I:S', (new Date)*1 + 60000);

			$scope.draw = function (type) {
				type = type || $scope.type;
				$scope.type = type;
				var phone = $scope.render(),
					money = $scope.money,
					time1 = $scope.time1,
					time2 = $scope.time2;

				switch(type) {
					case 'wallet':
						phone.set_wallet_page({wx_wallet: money});
						break;
					case 'pay':
						phone.set_pay_page({
							wx_pay_amount: money,
							wx_pay_time1: time1,
							wx_pay_time2: time2
						})
						break;
					default: break;
				}
			}

			function _ () {
				$scope.draw();
			}

			_();
		}]);
})();