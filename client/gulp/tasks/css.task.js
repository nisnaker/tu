module.exports = function (gulp, config, $) {
	
	var css_tasks = [];

	function make_task(bundle_name) {
		var task_name = 'css-' + bundle_name;
		css_tasks.push(task_name);

		var fn = function () {
			return gulp.src(config['csses'][bundle_name])
				.pipe($.concat(bundle_name + '.scss'))
				.pipe($.sass().on('error', $.sass.logError))
				// .pipe($.minifycss())
				// .pipe($.rev())
				.pipe($.manifest({bundleName: bundle_name, log: true}))
				.pipe(gulp.dest(config.static_dir + 'css/'));
		}

		gulp.task(task_name, fn);
	}

	for(bundle_name in config['csses']) {
		make_task(bundle_name);
	}

	gulp.task('css', css_tasks);
}