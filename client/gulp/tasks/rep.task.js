module.exports = function (gulp, config, $) {
	
	gulp.task('rep', ['js', 'css'], function () {
		return gulp.src(config['jades'])
			.pipe($.rep({
				manifestPath: 'asset_manifest.json',
				jsPath: '/static/js/',
				cssPath: '/static/css/'
			}))
			.pipe($.jade({
				pretty: true
			}))
			.pipe(gulp.dest('../public/tpls/'));
	});
}