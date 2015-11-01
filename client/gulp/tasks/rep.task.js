module.exports = function (gulp, config, $) {
	
	var manifestPath = 'asset_manifest.json';

	gulp.task('page_rep', ['js', 'css'], function () {
		return gulp.src(config['pagejades'])
			.pipe($.rep({
				manifestPath: manifestPath,
				jsPath: '/static/js/',
				cssPath: '/static/css/'
			}))
			.pipe($.jade({
				pretty: true
			}))
			.pipe(gulp.dest('../public/'))
	});

	gulp.task('rep', ['page_rep', 'js', 'css'], function () {
		return gulp.src(config['jades'])
			.pipe($.rep({
				manifestPath: manifestPath,
				jsPath: '/static/js/',
				cssPath: '/static/css/'
			}))
			.pipe($.jade({
				pretty: true
			}))
			.pipe(gulp.dest('../public/tpls/'));
	});
}