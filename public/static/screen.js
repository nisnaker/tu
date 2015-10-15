function l (a) {
	console.log(a)
}

(function () {

	var _Screen = {
		config: {
			width: 1080,
			height: 1920,
			id: 'phone'
		},
		handlers: {},
		init: function (args) {
			if(args)
			{
				for(i in args) {
					this.config[i] = args[i];
				}
			}

			var obj = document.getElementById(this.config.id);
			obj.width = this.config.width;
			obj.height = this.config.height;

			this.canvas = obj.getContext('2d');

			return this;
		},
		_draw: function (bg_name, fn) {
			var bg = this.handlers[bg_name];
			if(!bg || bg.complete) {
				fn();
			} else {
				bg.addEventListener('load', fn);
			}
		},
		set_image: function (name, bg_name, src, left, top, width, height) {
			var self = this;
			var img = new Image();

			img.src = src;

			this._draw(bg_name, function () {
				if(img.complete) {
					if(width)
						self.canvas.drawImage(img, left, top, width, height);
					else
						self.canvas.drawImage(img, left, top);
				} else {
					img.addEventListener('load', function () {
						if(width)
							self.canvas.drawImage(img, left, top, width, height);
						else
							self.canvas.drawImage(img, left, top);
					});
				}
			});
			
			this.handlers[name] = img;
		},
		set_text: function (bg_name, txt, fontsize, color, left, top, args) {
			var align = (args && args['align']) ? args['align'] : 'center';

			var self = this;
			this._draw(bg_name, function () {
				self.canvas.textAlign = align;
				self.canvas.font = fontsize + 'px verdana,"微软雅黑"';
				self.canvas.fillStyle = color;
				self.canvas.fillText(txt, left, top);
			});
		},
		draw_rect: function (bg_name, color, left, top, width, height, radius) {
			var self = this;
			this._draw(bg_name, function () {
				self.canvas.fillStyle = color;
				self.canvas.fillRect(left, top, width, height);
			});
		},
		draw_round_rect: function (bg_name, border_color, bg_color, left, top, width, height, radius) {
			var self = this;

			var x = left, y = top, w = width, h = height, r = radius;
			this._draw(bg_name, function () {
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
				// self.canvas.fillRect(x, y, w, h);
			});
		},
		draw_line: function (bg_name, color, left, top, width, height) {

		}
	}

	var Screen = function (args) {
		return Object.create(_Screen).init(args)
	}

	var _Phone = {
		config: {
			id: 'phone',
			bg_width: 770,
			bg_height: 1200,
			// bg_color: '#ebebeb',
			// bg_color: '#fff',
			bg_color: '#EFEFF4',
			header_signal: 3, // 0~5 信号强度
			header_carrier: '中国联通', // 中国移动 中国联通 中国电信,
			header_network: 'WIFI', // 无 WIFI G E 3G 4G
			header_time: '16:27',
			header_rotate: true, // 锁定屏幕旋转
			header_battery: 90, // 5~100%
			header_btr_state: 'normal', // normal charge
			header_btr_show_percent: false, // 显示电量百分比
			wx_talk_unread: 59, // 未读记录
			wx_talk_title: '马云', // 聊天标题
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

			this.screen.draw_rect('bg', this.config.bg_color, 0, 0, this.config.bg_width, this.config.bg_height, 100);
			this.set_navbar();
			// this.set_talk_header();
			// this.set_pay_page();
			this.set_wallet_page();

			return this;
		},
		set_navbar: function(args){ // 顶部状态栏
			this._set_config(args)

			var bg_width = this.config.bg_width;

			// 背景
			this.screen.set_image('header_bg', '', '/static/imgs/phone/ios-top-bg.png', 0, 0, bg_width, 128);

			// 信号
			this.screen.set_image('header_signal', 'header_bg', '/static/imgs/phone/ios-signal'+this.config.header_signal+'.png', 0, 0);

			// 运营商
			this.screen.set_text('header_bg', this.config.header_carrier, 25, 'white', 138, 28);

			// 网络
			this.screen.set_image('header_network', 'header_bg', '/static/imgs/phone/ios-top-'+this.config.header_network+'.png', 194, 0);

			// 时间
			this.screen.set_text('header_bg', this.config.header_time, 25, 'white', bg_width / 2, 28);

			var right_width = 0; // 右侧已占用宽度
			// 电池
			if('normal' == this.config.header_btr_state) {
				this.screen.set_image('header_bty', 'header_bg', '/static/imgs/phone/ios-top-btr-normal.png', bg_width - 70, 0);
				this.screen.draw_rect('header_bty', 'white', bg_width - 58, 13, this.config.header_battery / 2.5, 15);
				right_width = 70;
			} else {
				this.screen.set_image('header_bty', 'header_bg', '/static/imgs/phone/ios-top-btr-charge.png', bg_width - 85, 0);
				this.screen.draw_rect('header_bty', '#4cd964', bg_width - 83, 11, this.config.header_battery / 2, 18);
				right_width = 85;
			}

			// 电量
			if(this.config.header_btr_show_percent) {
				right_width += (this.config.header_battery > 10) ? 40 : 28;
				this.screen.set_text('header_bg', this.config.header_battery + '%', 23, 'white', bg_width - right_width, 28, {align: 'left'});
			}

			// 屏幕旋转
			if(this.config.header_rotate) {
				right_width += 30;
				this.screen.set_image('header_rotate', 'header_bg', '/static/imgs/phone/ios-top-rotate.png', bg_width - right_width, 0);
			}
		},
		set_talk_header: function (args) { // 聊天界面头部
			this._set_config(args);
			var bg_width = this.config.bg_width;

			// 返回箭头
			this.screen.set_image('wx_back', 'header_bg', '/static/imgs/phone/wx-back.png', 25, 60);
			// 右侧小人
			this.screen.set_image('wx_back', 'header_bg', '/static/imgs/phone/wx-talk-user.png', bg_width - 104, 38);


			// 未读记录
			this.screen.set_text('header_bg', '微信('+this.config.wx_talk_unread+')', 30, 'white', 66, 94, {align: 'left'});

			// 聊天标题
			this.screen.set_text('header_bg', this.config.wx_talk_title, 35, 'white', bg_width / 2, 96);
		},
		set_pay_page: function (args) { // 转账页面
			this._set_config(args);
			var bg_width = this.config.bg_width;
			var bg_height = this.config.bg_height;
			
			// header
			// 返回箭头
			this.screen.set_image('wx_back', 'header_bg', '/static/imgs/phone/wx-back.png', 25, 60);
			this.screen.set_text('header_bg', '返回', 30, 'white', 66, 94, {align: 'left'});

			this.screen.set_text('header_bg', '转账详情', 30, 'white', bg_width / 2, 85);
			this.screen.set_text('header_bg', '微信安全支付', 19, 'white', bg_width / 2, 115);

			// body
			this.screen.set_image('wx_pay', 'bg', '/static/imgs/phone/wx-pay.png', bg_width / 2 - 93, 220);
			this.screen.set_text('bg', '已收钱', 35, '#000', bg_width / 2, 445);
			this.screen.set_text('bg', '￥' + this.config.wx_pay_amount, 65, '#000', bg_width / 2, 545);
			this.screen.set_text('bg', '查看零钱', 25, '#919191', bg_width / 2, 600);


			// foot
			this.screen.set_text('bg', '转账时间: ' + this.config.wx_pay_time1, 27, '#919191', bg_width / 2, bg_height - 80);
			this.screen.set_text('bg', '收钱时间: ' + this.config.wx_pay_time2, 27, '#919191', bg_width / 2, bg_height - 40);
		},
		set_wallet_page: function  (args) {
			this._set_config(args);
			var bg_width = this.config.bg_width;
			var bg_height = this.config.bg_height;

			// header
			// 返回箭头
			this.screen.set_image('wx_back', 'header_bg', '/static/imgs/phone/wx-back.png', 25, 60);
			this.screen.set_text('header_bg', '返回', 30, 'white', 66, 94, {align: 'left'});

			this.screen.set_text('header_bg', '零钱', 30, 'white', bg_width / 2, 85);
			this.screen.set_text('header_bg', '微信安全支付', 19, 'white', bg_width / 2, 115);
			this.screen.set_text('header_bg', '零钱明细', 30, 'white', bg_width - 80, 94);

			// body
			this.screen.set_image('wx_pay', 'bg', '/static/imgs/phone/wx-wallet.png', bg_width / 2 - 122, 220);
			this.screen.set_text('bg', '我的零钱', 35, '#000', bg_width / 2, 510);
			this.screen.set_text('bg', '￥' + this.config.wx_wallet, 65, '#000', bg_width / 2, 580);

			this.screen.draw_round_rect('bg', '#199D18', '#06BF04', 50, 670, bg_width - 100, 100, 5);
			this.screen.draw_round_rect('bg', '#CECED1', '#f7f7f7', 50, 790, bg_width - 100, 100, 5);
			this.screen.set_text('bg', '充值', 35, '#fff', bg_width / 2, 730);
			this.screen.set_text('bg', '提现', 35, '#454545', bg_width / 2, 850);


			// foot
			this.screen.set_text('bg', '常见问题', 27, '#576B95', bg_width / 2, bg_height - 80);
			this.screen.set_text('bg', '本服务由财付通提供底层技术支持', 27, '#868686', bg_width / 2, bg_height - 40);
		}
	};


	var Phone = function (args) {
		return Object.create(_Phone).init(args);
	}

	window.Phone = Phone;

})();

window.onload = function(){
	var p0 = Phone({'id': 'phone'});
	// l(p0.config)
}