module.exports = function(){
	var bower_dir = 'bower_components/',
		buildcss_dir = 'assets/dist/css/',
		asset_dir = 'assets/';
		static_dir = '../public/static/';

	var config = {};

	config['static'] = [asset_dir + 'static/**/*', bower_dir + 'fex-webuploader/dist/Uploader.swf'];

	config['sassfiles'] = '../assets/sass/**/*.scss';
	config['buildcss_dir'] = buildcss_dir;
	config['static_dir'] = static_dir;

	config['csses'] = {
		'core_css': [
			bower_dir + 'fancybox/source/jquery.fancybox.css',
			asset_dir + 'core/css/core.scss'
		],
		'phone_css': [
			asset_dir + 'phone/css/**/*.scss'
		],
		'movie_css': [
			bower_dir + 'select2/dist/css/select2.min.css',
			asset_dir + 'movie/css/**/*.scss'
		]
	}

	config['jses'] = {
		'core_js': [
			asset_dir + 'core/js/use_strict.js',
			bower_dir + 'jquery/dist/jquery.min.js',
			bower_dir + 'fancybox/source/jquery.fancybox.pack.js',

			bower_dir + 'angular/angular.min.js',
			bower_dir + 'angular-route/angular-route.min.js',
			
			asset_dir + 'core/js/tools.js',
			asset_dir + 'core/js/core.ag.js',
			asset_dir + 'core/js/service.ag.js',
			asset_dir + 'core/js/config.ag.js',
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
			bower_dir + 'select2/dist/js/select2.min.js',
			bower_dir + 'fex-webuploader/dist/webuploader.min.js',
			asset_dir + 'movie/js/upload.js',
			asset_dir + 'movie/js/movie.ag.js'
		]
	}

	config['jades'] = ['assets/**/*.jade', '!assets/**/*.inc.jade']
	config['pagejades'] = 'assets/core/pages/*.pagejade'

	all_resources = []


	return config;
}