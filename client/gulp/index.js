var gulp = require('gulp'),
	config = require('./gulp.config')(),
	plugins = require('gulp-load-plugins')({
		'rename': {
			'gulp-asset-manifest': 'manifest',
			'gulp-rev-rep': 'rep'
		}
	});

var tasks = require('fs').readdirSync('./gulp/tasks/');
tasks.forEach(function (file) {
	require('./tasks/' + file)(gulp, config, plugins);
});

gulp.task('build', ['css', 'js', 'rep']);

gulp.task('watch', ['build'], function () {
	gulp.watch('assets/**/*.scss', ['css']);
	gulp.watch('assets/**/*.js', ['js']);
	gulp.watch('assets/**/*.jade', ['rep_watch']);
	gulp.watch('assets/**/*.pagejade', ['rep_watch']);
});

gulp.task('default', ['watch']);
