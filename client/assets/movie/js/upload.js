(function () {
	'use strict';

	var uploader;

	var _ = {
		error: {
			http: '网络错误'
		},
		init: function () {
			this.file_count = 0;
			this.file_size = 0;
			this.percentages = {};
			this.state = 'pending';
			this.$ = {
				dragarea: $('#dragarea'),
				statusbar: $('.statusbar'),
				fileList: $('#fileList'),
				upload: $('.uploadBtn'),
				pick2: $('#filePicker2')
			};
			this.$['progress'] = this.$.statusbar.find('.progress').hide();
			this.$['info'] = this.$.statusbar.find('.info');
		},
		fileQueued: function (file) {
			_.file_count++;
			_.file_size += file.size;

			_.addFile(file);
			_.setState('ready');
			_.updateTotalProgress();
		},
		addFile: function (file) {
			var li = $('<li id="'+file.id+'">' +
					'<p class="imgwrap"></p>' +
					'<p class="imggress"><span></span></p>' +
					'</li>'),
				cancel = $('<div class="file-panel">' +
					'<span class="cancel">删除</span>' +
					'</div>').appendTo(li),
				imggress = li.find('.imggress span'),
				wrap = li.find('.imgwrap'),
				info = $('<p class="error"></p>'),

				showError = function(code){
					info.text(_.error[code]).appendTo(li);
				};

				if(file.getStatus() == 'invalid') {
					showError(file.statusText);
				} else {
					wrap.text('预览中……');
					uploader.makeThumb(file, function (error, src) {
						if(error) {
							wrap.text('不能预览');
							return;
						}

						_.percentages[file.id]['small'] = src;
						var img = $('<img src="'+src+'">');
						wrap.empty().append(img);
					}, 120, 100);
	
					_.percentages[file.id] = {size:file.size, per: 0};
				}

				file.on('statuschange', function (cur, prev) {
					if('progress' == prev) {
						_.$.progress.hide();
					} else if('queued' == prev) {
						li.off('mouseenter mouseleave');
						cancel.remove();
					}

					if('error' == cur || 'invalid' == cur) {
						showError(file.statusText);
						_.percentages[file.id]['per'] = 1;
						imggress.hide();
					} else if('intertupt' == cur) {
						showError('intertupt');
					} else if('ququed' == cur) {
						_.percentages[file.id]['per'] = 0;
					} else if('progress' == cur) {
						info.remove();
						_.$.progress.css('display', 'block');
					} else if('complete' == cur) {
						li.append('<span class="success">上传成功</span>');
					}

					li.removeClass('state-' + prev).addClass('state-' + cur)
				});

				li.on('mouseenter', function () {
					cancel.stop().animate({height: 19});
				});

				li.on('mouseleave', function () {
					cancel.stop().animate({height: 0});
				});

				cancel.on('click', 'span', function () {
					uploader.removeFile(file);
				});

				li.appendTo(_.$.fileList);
		},
		fileDequeued: function (file) {
			_.file_count--;
			_.file_size -= file.size;

			if(!_.file_count) {
				_.setState('pending');
			}

			var li = $('#' + file.id);
			delete _.percentages[file.id];
			li.off().find('.file-panel').off().end().remove();

			_.updateTotalProgress();
		},
		upload: function () {
			if($(this).hasClass('disabled'))
				return;

			if('ready' == _.state)
				uploader.upload();
		},
		setState: function (val) {
			if(_.state == val)
				return;

			_.$.upload.removeClass('state-' + _.state);
			_.$.upload.addClass('state-' + val);
			_.state = val;

			var stats;
			switch(val){
				case 'ready':
					_.$.dragarea.hide();
					_.$.statusbar.show();
					uploader.refresh();
					break;
				case 'confirm':
					_.$.progress.hide();
					_.$.upload.text('开始上传').addClass('disabled');
					stats = uploader.getStats();
					if(stats.successNum && !stats.uploadFailNum) {
						_.setState('finish');
						return;
					}
					break;
				case 'uploading':
					_.$.pick2.hide();
					_.$.progress.show();
					break;
				case 'finish':
					_.$.pick2.show();
					_.$.upload.removeClass('disabled');
					stats = uploader.getStats();
					if(stats.successNum) {
						_Uploader._finish();
						// l('上传成功')
					}
					break;
				default:
			}

			_.updateStatus();
		},
		updateStatus: function () {
			var text = '', stats = uploader.getStats(),
				size = WebUploader.formatSize(_.file_size);

			if(_.state == 'ready') {
				text = '选中' + _.file_count + '张图片，共' + size + '。';
			} else if('confirm' == _.state) {
				if(stats.uploadFailNum) {
					text = '已成功上传'+stats.successNum+'张图片，'+stats.uploadFailNum+'张上传失败，<a href="#">重新上传</a>失败图片或者<a href="#">忽略</a>。';
				}
			} else {
				text = '共'+_.file_count+'张('+size+')，已上传'+stats.successNum+'张';
				if(stats.uploadFailNum) {
					text += '，失败'+stats.uploadFailNum+'张';
				}

				text += '。';
			}

			_.$.info.html(text)
		},
		all: function (type) {
			switch(type){
				case 'uploadFinished':
					_.setState('confirm');
					break;
				case 'startUpload':
					_.setState('uploading');
					break;
			}
		},
		uploadSuccess: function (file, resp) {
			_.percentages[file.id]['big'] = resp.result;
		},
		uploadProgress: function (file, percentage) {
			var percent = $('#' + file.id).find('.imggress span').show();
			
			percent.text(Math.ceil(percentage * 100) + '%');
			percent.css('width', percent * 100 + '%');
			_.percentages[file.id]['per'] = percentage;
			_.updateTotalProgress();
		},
		updateTotalProgress: function () {
			var loaded = 0,
				total = 0,
				spans = _.$.progress.children(),
				percent;

			$.each(_.percentages, function (k, v) {
				total += v.size;
				loaded += v.size * v.per;
			});

			percent = total ? loaded / total : 0;

			if(1 == percent)
				spans.eq(0).text('上传完毕，正在加载，请稍后……').css('color', '#fff');
			else
				spans.eq(0).text(Math.ceil(percent * 100) + '%').css('color', '#333');

			spans.eq(1).css('width', Math.round(percent * 100) + '%');
			_.updateStatus();
		}
	};

	var _Uploader = {
		init: function (domain) {
			uploader = WebUploader.create({
				swf: '/static/Uploader.swf',
				server: domain + '/photo/upload',
				pick: '#filePicker',
				dnd: "#dragarea",
				disableGlobalDnd: true,
				paste: document.body,
				fileNumLimit: 8,
				accept: {
					title: 'Images',
					extensions: 'gif,jpg,jpeg,bmp,png',
					mimeTypes: 'image/*'
				},
				compress: {
					width: 1600,
					height: 900,
					quality: 80,
					preserveHeaders: false
				}
			});
			uploader.addButton('#filePicker2');

			_.init();
			this._add_events();

			return this;
		},
		_add_events: function () {
			uploader.on('fileQueued', _.fileQueued);
			uploader.on('fileDequeued', _.fileDequeued);
			uploader.on('uploadProgress', _.uploadProgress);
			uploader.on('uploadSuccess', _.uploadSuccess);
			uploader.on('all', _.all);
			_.$.upload.on('click', _.upload);
		},
		finish: function (func) {
			uploader.finish_func = func;
		},
		_finish: function () {
			var imgs = {}, n = 0, i;
			for(i in _.percentages) {
				if(_.percentages[i]['big']) {
					imgs[i] = _.percentages[i];
					n++;
				}
			}

			uploader.finish_func(imgs, n);
		}
	};

	window.Uploader = function (domain) {
		return Object.create(_Uploader).init(domain);
	}
})();