module.exports = function(){
	var bower_dir = 'bower_components/',
		buildcss_dir = 'assets/dist/css/',
		asset_dir = 'assets/';
		static_dir = '../public/static/';

	var config = {};

	config['sassfiles'] = '../assets/sass/**/*.scss';
	config['buildcss_dir'] = buildcss_dir;
	config['static_dir'] = static_dir;

	config['csses'] = {
		'core_css': [
			asset_dir + 'core/css/core.scss'
		],
		'phone_css': [
			asset_dir + 'core/css/core.scss',
			asset_dir + 'phone/css/**/*.scss'
		],
		'movie_css': [
			asset_dir + 'core/css/core.scss',
			asset_dir + 'movie/css/**/*.scss'
		]
	}

	config['jses'] = {
		'core_js': [
			bower_dir + 'angular/angular.js',
			bower_dir + 'angular-route/angular-route.min.js',
			asset_dir + 'core/js/tools.js',
			asset_dir + 'core/js/core.ag.js',
			asset_dir + 'core/js/config.ag.js',
			asset_dir + 'core/js/service.ag.js',
			asset_dir + 'core/js/directive.ag.js',
			asset_dir + 'core/js/controller.ag.js',
			asset_dir + 'core/js/*.js',
		],
		'phone_js': [
			asset_dir + 'phone/js/info.js',
			asset_dir + 'phone/js/phone.js',
			asset_dir + 'phone/js/phone.ag.js'
		],
		'movie_js': [
			asset_dir + 'movie/js/movie.ag.js'
		]
	}

	config['jades'] = ['assets/**/*.jade', '!assets/**/*.inc.jade']
	config['pagejades'] = 'assets/core/pages/*.pagejade'

	all_resources = []


	return config;
}