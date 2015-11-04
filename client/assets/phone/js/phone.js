function l (a) {
	console.log(a)
}

(function () {

	var _Screen = {
		config: {
			width: 1080,
			height: 1920,
			id: 'phone',
			fontface: '"PingFang SC Regular",verdana, 黑体, 微软雅黑',
		},
		_imgs_loaded: 0,
		_imgs: [],
		_funcs: [],
		init: function (args) {
			if(args)
			{
				for(i in args) {
					this.config[i] = args[i];
				}
			}

			// init
			this._imgs_loaded = 0;
			this._imgs = [];
			this._funcs = [];

			var obj = document.getElementById(this.config.id);
			obj.width = this.config.width;
			obj.height = this.config.height;
			this.canvas = obj.getContext('2d');

			return this;
		},
		_loading_resource: function () { // 预加载图片资源，加载完成后开始渲染
			var percent = this._imgs_loaded + '/' + this._imgs.length;
			
			this.canvas.clearRect(0, 0, this.config.width, this.config.height);
			this.canvas.textAlign = 'center';
			this.canvas.fillStyle = 'gray';
			this.canvas.font = '40px ' + this.config.fontface;
			this.canvas.fillText('资源加载中：' + percent, this.config.width / 2, this.config.height / 2);

			if(this._imgs_loaded == this._imgs.length) {
				this._render();
			}
		},
		_render: function () {
			this.canvas.clearRect(0, 0, this.config.width, this.config.height);

			for(i in this._funcs) {
				this._funcs[i]();
			}
		},
		set_image: function (src, left, top, width, height) {
			this._imgs.push(src);

			var img = new Image();
			img.src = src;

			var self = this;

			this._draw(function(){
				if(width) {
					self.canvas.drawImage(img, left, top, width, height);
				} else {
					self.canvas.drawImage(img, left, top);
				}
			});

			this._loading_resource();

			img.onload = function () {
				self._imgs_loaded += 1;
				self._loading_resource();
			}
		},
		_draw: function (fn) {
			this._funcs.push(fn);
			if(this._imgs.length == this._imgs_loaded) fn();
		},
		set_text: function (txt, fontsize, color, left, top, args) {
			var align = (args && args['align']) ? args['align'] : 'center'; // 对齐
			var max_width = (args && args['max_width']) ? args['max_width'] : 0; // 限定最大宽度
			var calc_only = (args && args['calc_only']) ? args['calc_only'] : false; // 仅计算，不渲染
			var textarea_width = 0, textarea_height = 0; // 计算文本区域高度
			var line_height = 10; // 行间距
			var self = this;

			// 按给定宽度拆文本
			if(max_width) {
				var lines = [], x = left, y = top;

				self.canvas.font = fontsize + 'px ' + this.config.fontface;;
				for(i = 0, j = 0; i < txt.length; i++) {
					lines[j] = lines[j] || '';
					var _test_line = lines[j] + txt[i];
					var _width = self.canvas.measureText(_test_line).width;
					if(_width > max_width) {
						y += fontsize;
						j++;
						lines[j] = txt[i];
						textarea_width = max_width;
					} else {
						lines[j] = _test_line;
						textarea_width = Math.max(textarea_width, _width);
					}
				}

				// 文本域高度
				textarea_height = lines.length * (fontsize + line_height) - line_height;
			}

			if(calc_only) return {width: textarea_width, height: textarea_height};

			var self = this;
			this._draw(function () {
				self.canvas.textAlign = align;
				self.canvas.font = fontsize + 'px ' + self.config.fontface;;
				self.canvas.fillStyle = color;
				if(max_width)
				{
					var y = top;
					for(i in lines) {
						self.canvas.fillText(lines[i], left, top);
						top += (fontsize + line_height);
					}
				}
				else
					self.canvas.fillText(txt, left, top);
			});
		},
		draw_rect: function (color, left, top, width, height) {
			var self = this;
			this._draw(function () {
				self.canvas.fillStyle = color;
				self.canvas.fillRect(left, top, width, height);
			});
		},
		draw_round_rect: function (border_color, bg_color, left, top, width, height, radius) {
			var self = this;

			var x = left, y = top, w = width, h = height, r = radius;
			this._draw(function () {
				self.canvas.beginPath();
				self.canvas.moveTo(x + r, y);
				self.canvas.arcTo(x + w, y, x + w, y + h, r);
				self.canvas.arcTo(x + w, y + h, x, y + h, r);
				self.canvas.arcTo(x, y + h, x, y, r);
				self.canvas.arcTo(x, y, x + w, y, r);
				self.canvas.closePath();

				self.canvas.strokeStyle = border_color;
				self.canvas.fillStyle = bg_color;
				self.canvas.stroke();
				self.canvas.fill();
			});
		},
		draw_line: function (color, left, top, width, height) {
			var self = this;

			this._draw(function () {
				self.canvas.beginPath();
				self.canvas.moveTo(left, top);
				self.canvas.lineTo(left + width, top + height);
				self.canvas.strokeStyle = color;
				self.canvas.lineWidth = 1;
				self.canvas.stroke();
			});
		}
	}

	var Screen = function (args) {
		return Object.create(_Screen).init(args);
	}

	var _Phone = {
		config: {
			id: 'phone',
			bg_width: 770,
			bg_height: 1200,
			bg_color: '#ececec',
			header_signal: 3, // 0~5 信号强度
			header_carrier: '中国联通', // 中国移动 中国联通 中国电信,
			header_network: 'WIFI', // 无 WIFI G E 3G 4G
			header_time: '16:27',
			header_rotate: true, // 锁定屏幕旋转
			header_btr: 90, // 5~100%
			header_btr_charging: true, // 充电状态：true / false
			header_btr_show_percent: false, // 显示电量百分比
			avatar_left: '', // 左侧头像
			avatar_right: '', // 右侧头像
			wx_bg_img: '', // 聊天背景图片
			wx_talk_unread: 59, // 未读记录
			wx_talk_title: '朽木露琪亚', // 聊天标题
			wx_pay_amount: '20.00', // 转账金额
			wx_pay_time1: '2015-10-12 18:45:43', // 转账时间
			wx_pay_time2: '2015-01-01 10:15:10', // 收钱时间
			wx_wallet: '88.88', // 我的零钱
		},
		_set_config: function (args) {
			if(args)
			{
				for(i in args) {
					this.config[i] = args[i];
				}
			}
		},
		init: function (args) {
			this._set_config(args);

			this.screen = Screen({
				id: this.config.id,
				width: this.config.bg_width,
				height: this.config.bg_height
			});

			// this.screen.draw_rect(this.config.bg_color, 0, 0, this.config.bg_width, this.config.bg_height);
			// this.set_navbar();
			return this;			
		},
		set_navbar: function(args){ // 顶部状态栏
			this._set_config(args)

			var bg_width = this.config.bg_width;

			// 背景
			this.screen.set_image('/static/imgs/phone/ios-top-bg.png', 0, 0, bg_width, 128);

			// 信号
			this.screen.set_image('/static/imgs/phone/ios-signal'+this.config.header_signal+'.png', 0, 0);

			// 运营商
			this.screen.set_text(this.config.header_carrier, 25, 'white', 138, 28);

			// 网络
			this.screen.set_image('/static/imgs/phone/ios-top-'+this.config.header_network+'.png', 194, 0);

			// 时间
			this.screen.set_text(this.config.header_time, 25, 'white', bg_width / 2, 28);

			var right_width = 0; // 右侧已占用宽度
			// 电池
			if(this.config.header_btr_charging) {
				this.screen.set_image('/static/imgs/phone/ios-top-btr-charge.png', bg_width - 85, 0);
				this.screen.draw_rect('#4cd964', bg_width - 83, 11, this.config.header_btr / 2, 18);
				right_width = 90;
			} else {
				this.screen.set_image('/static/imgs/phone/ios-top-btr-normal.png', bg_width - 70, 0);
				this.screen.draw_rect('white', bg_width - 58, 13, this.config.header_btr / 2.5, 15);
				right_width = 65;
			}

			// 电量
			if(this.config.header_btr_show_percent) {
				var b = parseInt(this.config.header_btr);
				var size = this.screen.set_text(b + '%', 23, 'white', 0, 0, {max_width: 1000, calc_only: true}); // 文本实际尺寸
				
				right_width += size.width;
				this.screen.set_text(b + '%', 23, 'white', bg_width - right_width, 28, {align: 'left'});
			}

			// 屏幕旋转
			if(this.config.header_rotate) {
				right_width += 35;
				this.screen.set_image('/static/imgs/phone/ios-top-rotate.png', bg_width - right_width, 0);
			}
		},
		_set_talk_header: function () { // 聊天界面头部
			var bg_width = this.config.bg_width;

			// 返回箭头
			this.screen.set_image('/static/imgs/phone/wx-back.png', 15, 63);
			// 右侧小人
			this.screen.set_image('/static/imgs/phone/wx-talk-user.png', bg_width - 73, 64);


			// 未读记录
			var u = parseInt(this.config.wx_talk_unread);
			var word = '微信' + ( u > 0 ? '('+u+')' : '' );
			this.screen.set_text(word, 30, 'white', 50, 98, {align: 'left'});

			// 聊天标题
			this.screen.set_text(this.config.wx_talk_title, 35, 'white', bg_width / 2, 100);
		},
		_set_talk_footer: function () { // 聊天界面底部
			var bg_width = this.config.bg_width, bg_height = this.config.bg_height;
			var height = 100, top = bg_height - height;

			// 背景色
			this.screen.draw_rect('#F4F4F4', 0, top, bg_width, height);
			// 分割线
			this.screen.draw_line('#AAA', 0, top + 1, bg_width, 0);
			// 语音图标
			this.screen.set_image('/static/imgs/phone/wx-footer-voice.png', 9, top + 22);
			// 输入框
			this.screen.draw_round_rect('#AEB0B3', '#FFF', 85, top + 13, bg_width - 250, 74, 10);
			// 表情图标
			this.screen.set_image('/static/imgs/phone/wx-footer-smile.png', bg_width - 142, top + 21);
			// 加号图标
			this.screen.set_image('/static/imgs/phone/wx-footer-plus.png', bg_width - 67, top + 21);
		},
		set_talk_content: function (args, talks) {
			this._set_config(args);
			if(this.config.wx_bg_img)
				this.screen.set_image(this.config.wx_bg_img, 0, 0, this.config.bg_width, this.config.bg_height);
			else
				this.screen.draw_rect('#ececec', 0, 0, this.config.bg_width, this.config.bg_height);

			this.set_navbar();

			this._set_talk_header();

			var top = 160, bg_width = this.config.bg_width;
			var self = this;
			var padding = 25; // 聊天界面内边距
			var avatar_side = 80; // 头像边长
			var holder = 110; // 留白
			var green_bg_color = '#91ED61', green_border_color = '#51A524',
				white_bg_color = '#FFF', white_border_color = '#AAA';

			// 头像
			var set_avatar = function (align) {
				var left = ('left' == align) ? padding : (bg_width - padding - avatar_side);
				var avatar = ('left' == align) ? self.config.avatar_left : self.config.avatar_right;
				self.screen.set_image(avatar, left, top, avatar_side, avatar_side);
			}

			// 气泡尖角
			var set_pop = function (align, top) {
				if('left' == align)
				{
					var w = padding + avatar_side + 14;
					self.screen.set_image('/static/imgs/phone/wx-txt-bg2.png', w, top + 23);
				} else {
					var w = bg_width - padding * 2 - avatar_side - 6;
					self.screen.set_image('/static/imgs/phone/wx-txt-bg1.png', w, top + 23);
				}
			}

			for(i in talks) {
				if(top > this.config.bg_height - 100) break;
				var t = talks[i];
				switch(t.type) {
					case 'time': // 聊天时间
						var fontsize = 25;
						var max_width = bg_width - padding * 5 - holder; // 文本最大宽度
						var size = this.screen.set_text(t.content, fontsize, 'red', 0, 0, {max_width: max_width, calc_only: true}); // 文本实际尺寸


						var w = size.width / 2 + 15, h = size.height + 35;
						w = Math.max(w, 52);
						this.screen.draw_round_rect('#cecece', '#cecece', bg_width / 2 - w, top, w * 2, h, 10);
						this.screen.set_text(t.content, fontsize, '#fff', bg_width / 2, top + 40);
						top += h + 20;
						break;
					case 'text': // 文本
						var fontsize = 30;
						set_avatar(t.align);

						var txt_max_width = bg_width - padding * 5 - avatar_side - holder; // 文本最大宽度
						var txt_size = this.screen.set_text(t.content, fontsize, 'red', 0, 0, {align: 'left', max_width: txt_max_width, calc_only: true}); // 文本实际尺寸
						var txt_top = top + padding * 2;
						
						var txt_bg_width = txt_size.width + padding * 2; // 文本背景宽度
						var txt_bg_height = txt_size.height + padding * 2; // 文本背景高度

						if('left' == t.align) {
							var txt_bg_left = padding * 2 + avatar_side; // 文本背景的x参数
							this.screen.draw_round_rect(white_border_color, white_bg_color, txt_bg_left, top, txt_bg_width, txt_bg_height, 5);
							
						} else {
							var txt_bg_left = bg_width - padding * 2 - avatar_side - txt_bg_width; // 文本背景的x参数
							this.screen.draw_round_rect(green_border_color, green_bg_color, txt_bg_left, top, txt_bg_width, txt_bg_height, 5);
						}

						this.screen.set_text(t.content, fontsize, '#000', txt_bg_left + padding, txt_top, {align: 'left', max_width: txt_max_width});

						set_pop(t.align, top);

						top += (txt_bg_height + 30);
						break;
					case 'voice': // 语音
						set_avatar(t.align);
						var fontsize = 25;

						// [100, bg_width - 300]
						if(t.content > 60) {
							var len = bg_width - 300;
						} else {
							var len = t.content / 60.0 * (bg_width - 400) + 100;
						}

						if('left' == t.align) {
							// 底色
							var left = padding * 2 + avatar_side;
							this.screen.draw_round_rect(white_border_color, white_bg_color, left, top, len, avatar_side, 5);
							// 图标
							var w = left + 20;
							self.screen.set_image('/static/imgs/phone/wx-voice2.png', w, top + 20);
							// 时长

							var w = left + len + 20;
							this.screen.set_text(t.content + "''", fontsize, '#9B9B9B', w, top + 55, {align:'left'});
						} else {
							// 底色
							var left = bg_width - padding * 2 - avatar_side - len;
							this.screen.draw_round_rect(green_border_color, green_bg_color, left, top, len, avatar_side, 5);
							// 图标
							var w = left + len - 40 - 20;
							self.screen.set_image('/static/imgs/phone/wx-voice1.png', w, top + 20);
							// 时长
							var w = left - 20;
							this.screen.set_text(t.content + "''", fontsize, '#9B9B9B', w, top + 55, {align:'right'});
						}

						set_pop(t.align, top);
						top += avatar_side + 30;
						break;
					case 'video': // 视频
						var fontsize = 30;
						var pic_width = 108;
						set_avatar(t.align);

						var len = this.screen.set_text('通话时长 ' + t.content, fontsize, '#000', 0, 0, {max_width: bg_width, calc_only:true}).width;
						if('left' == t.align) {
							// 背景
							var left = padding * 2 + avatar_side;
							this.screen.draw_round_rect(white_border_color, white_bg_color, left, top, len + pic_width + padding, avatar_side, 5);
							// 图标
							var w = left;
							self.screen.set_image('/static/imgs/phone/wx-video2.png', w, top + 10);
							// 时长
							var w = left + pic_width;
							this.screen.set_text('通话时长 ' + t.content, fontsize, '#000', w, top + 50, {align:'left', max_width: bg_width});
						} else {
							// 背景
							var left = bg_width - padding * 2 - avatar_side - len - pic_width - padding;
							this.screen.draw_round_rect(green_border_color, green_bg_color, left, top, len + pic_width + padding, avatar_side, 5);
							// 图标
							var w = left + len + padding;
							self.screen.set_image('/static/imgs/phone/wx-video1.png', w, top + 10);
							// 时长
							var w = left + padding;
							this.screen.set_text('通话时长 ' + t.content, fontsize, '#000', w, top + 50, {max_width: bg_width, align: 'left'});

						}

						set_pop(t.align, top);
						top += avatar_side + 30;

						break;
					case 'pay_send':
						if(!t.forward) t.forward = 'send';
					case 'pay_rec':
						if(!t.forward) t.forward = 'rec';
					case 'pay':
						set_avatar(t.align);
						var pic_width = 430;
						var fontsize = 28;
						var words = ('send' == t.forward) ? '转账给你' : '已收钱';
						if('right' == t.align && 'send' == t.forward)
							words = '转账给' + this.config.wx_talk_title;
						var icon = '/static/imgs/phone/wx-pay-'+t.forward+'.png';
						
						if('left' == t.align) {
							// 背景
							var left = padding * 2 + avatar_side - 5;
							this.screen.set_image('/static/imgs/phone/wx-pay-left.png', left, top);
							// icon
							this.screen.set_image(icon, left + 35, top + 30);
							// 文案
							this.screen.set_text(words, fontsize, '#FFF', left + 112, top + 55, {align:'left'});
							// 金额
							this.screen.set_text('￥' + t.content, fontsize, '#FFF', left + 112, top + 100, {align:'left'});

						} else {
							// 背景
							var left = bg_width - padding * 2 - avatar_side - pic_width + 5;
							this.screen.set_image('/static/imgs/phone/wx-pay-right.png',left, top);
							// icon
							this.screen.set_image(icon, left + 21, top + 30);
							// 文案
							this.screen.set_text(words, fontsize, '#FFF', left + 105, top + 55, {align:'left'});
							// 金额
							this.screen.set_text('￥' + t.content, fontsize, '#FFF', left + 105, top + 100, {align:'left'});

						}

						top += (186 + 30);
						break;
					default: l('nothing')
				};
			}
			this._set_talk_footer();
		},
		set_pay_page: function (args) { // 转账页面
			this._set_config(args);

			var bg_width = this.config.bg_width;
			var bg_height = this.config.bg_height;
			this.screen.draw_rect('#fff', 0, 0, bg_width, bg_height);
			this.set_navbar();
			
			// header
			// 返回箭头
			this.screen.set_image('/static/imgs/phone/wx-back.png', 25, 60);
			this.screen.set_text('返回', 30, 'white', 66, 94, {align: 'left'});

			this.screen.set_text('转账详情', 30, 'white', bg_width / 2, 85);
			this.screen.set_text('微信安全支付', 19, 'white', bg_width / 2, 115);

			// body
			this.screen.set_image('/static/imgs/phone/wx-pay.png', bg_width / 2 - 93, 220);
			this.screen.set_text('已收钱', 35, '#000', bg_width / 2, 445);
			this.screen.set_text('￥' + this.config.wx_pay_amount, 65, '#000', bg_width / 2, 545);
			this.screen.set_text('查看零钱', 25, '#5B6980', bg_width / 2, 600);


			// foot
			this.screen.set_text('转账时间: ' + this.config.wx_pay_time1, 27, '#939393', bg_width / 2, bg_height - 80);
			this.screen.set_text('收钱时间: ' + this.config.wx_pay_time2, 27, '#939393', bg_width / 2, bg_height - 40);
		},
		set_wallet_page: function  (args) { // 零钱页面
			this._set_config(args);
			var bg_width = this.config.bg_width;
			var bg_height = this.config.bg_height;
			this.screen.draw_rect('#fff', 0, 0, bg_width, bg_height);
			this.set_navbar();

			// header
			// 返回箭头
			this.screen.set_image('/static/imgs/phone/wx-back.png', 25, 60);
			this.screen.set_text('返回', 30, 'white', 66, 94, {align: 'left'});

			this.screen.set_text('零钱', 30, 'white', bg_width / 2, 85);
			this.screen.set_text('微信安全支付', 19, 'white', bg_width / 2, 115);
			this.screen.set_text('零钱明细', 30, 'white', bg_width - 80, 94);

			// body
			this.screen.set_image('/static/imgs/phone/wx-wallet.png', bg_width / 2 - 122, 220);
			this.screen.set_text('我的零钱', 35, '#000', bg_width / 2, 510);
			this.screen.set_text('￥' + this.config.wx_wallet, 65, '#000', bg_width / 2, 580);

			this.screen.draw_round_rect('#189B17', '#06BE04', 50, 670, bg_width - 100, 100, 5);
			this.screen.draw_round_rect('#CECECE', '#F7F7F7', 50, 790, bg_width - 100, 100, 5);
			this.screen.set_text('充值', 37, '#fff', bg_width / 2, 730);
			this.screen.set_text('提现', 37, '#454545', bg_width / 2, 850);


			// foot
			this.screen.set_text('常见问题', 27, '#027BFF', bg_width / 2, bg_height - 80);
			this.screen.set_text('本服务由财付通提供底层技术支持', 27, '#868686', bg_width / 2, bg_height - 40);
		}
	};


	var Phone = function (args) {
		return Object.create(_Phone).init(args);
	}

	window.Phone = Phone;

})();

// window.onload = function(){
	// var p0 = Phone({'id': 'phone'});
	// l(p0.config)
// };



/* 
 
[{
				type: 'time',
				content: '14:25'
			},{
				avatar: IMG2,
				type: 'text',
				align: 'left',
				content: '下雨了，伞给你吧，走路小心点别淋雨感冒',
			}, {
				avatar: IMG1,
				type: 'text',
				align: 'right',
				content: '那你怎么办',
			}, {
				avatar: IMG2,
				type: 'text',
				align: 'left',
				content: '我打车。',
			}, {
				avatar: IMG1,
				type: 'voice',
				align: 'right',
				duration: 3
			}, {
				avatar: IMG2,
				type: 'voice',
				align: 'left',
				duration: 70
			}, {
				avatar: IMG1,
				type: 'video',
				align: 'right',
				duration: '13:00'
			}, {
				avatar: IMG2,
				type: 'video',
				align: 'left',
				duration: '21:00'
			}, {
				avatar: IMG1,
				type: 'pay',
				align: 'right',
				forward: 'send',
				money: '88.88'
			}, {
				avatar: IMG2,
				type: 'pay',
				align: 'left',
				forward: 'rec',
				money: '88.88'
			}, {
				avatar: IMG2,
				type: 'pay',
				align: 'left',
				forward: 'send',
				money: '88.88'
			}, {
				avatar: IMG1,
				type: 'pay',
				align: 'right',
				forward: 'rec',
				money: '88.88'
			}]

 */