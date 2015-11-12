module.exports = function (gulp, config, $) {
	
	var manifestPath = 'asset_manifest.json';

	gulp.task('page_rep', ['js', 'css'], function () {
		return gulp.src(config['pagejades'])
			.pipe($.jade({
				pretty: true
			}))
			.pipe($.rep({
				manifestPath: manifestPath,
				jsPath: '/static/js/',
				cssPath: '/static/css/'
			}))
			.pipe(gulp.dest('../public/'))
	});

	gulp.task('rep', ['page_rep', 'js', 'css'], function () {
		return gulp.src(config['jades'])
			.pipe($.jade({
				pretty: true
			}))
			.pipe($.rep({
				manifestPath: manifestPath,
				jsPath: '/static/js/',
				cssPath: '/static/css/'
			}))
			.pipe(gulp.dest('../public/tpls/'));
	});

	// for watch
	gulp.task('rep_watch', ['page_rep'], function () {
		return gulp.src(config['jades'])
			.pipe($.jade({
				pretty: true
			}))
			.pipe($.rep({
				manifestPath: manifestPath,
				jsPath: '/static/js/',
				cssPath: '/static/css/'
			}))
			.pipe(gulp.dest('../public/tpls/'));
	});
}