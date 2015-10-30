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
	console.log('./tasks/' + file)
	require('./tasks/' + file)(gulp, config, plugins);
});

gulp.task('build', ['css', 'js', 'rep']);

gulp.task('watch', ['build'], function () {
	
});

gulp.task('default', ['watch']);
