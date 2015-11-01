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
			asset_dir + 'core/css/core.css'
		],
		'phone_css': [
			asset_dir + 'core/css/core.css',
			asset_dir + 'phone/css/**/*.css'
		]
	}

	config['jses'] = {
		'core_js': [
			bower_dir + 'angular/angular.min.js',
			bower_dir + 'angular-route/angular-route.min.js',
		],
		'phone_js': [
			// bower_dir + 'angular/angular.min.js',
			// bower_dir + 'angular-route/angular-route.min.js',
			asset_dir + 'phone/js/phone.js',
			asset_dir + 'phone/js/wx.angular.js'
		]
	}

	config['jades'] = ['assets/**/*.jade', '!assets/**/*.inc.jade']
	config['pagejades'] = 'assets/core/pages/*.pagejade'

	all_resources = []


	return config;
}