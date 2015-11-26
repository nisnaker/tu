(function () {
	'use strict';

	var movie = angular.module('jietu8', ['app.core', 'mvCtrls']);

	movie.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/list/:id', {
				templateUrl: '/tpls/movie/tpls/list.html',
				controller: 'listCtrl'
			})
		.when('/new', {
			templateUrl: '/tpls/movie/tpls/new.html',
			controller: 'newCtrl'
		})
		.when('/join', {
			templateUrl: '/tpls/movie/tpls/join.html',
			controller: 'joinCtrl'
		})
		.otherwise({
				redirectTo: '/list/1'
			});
	}]);

	movie.run(['$rootScope', function ($rootScope) {
		$rootScope.page = {
			title: '电影截图',
			name: 'movie'
		};
	}]);

	var mvCtrls = angular.module('mvCtrls', []);
	var back_domain = 'http://tu.me';

	mvCtrls.controller('listCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
		$scope.fb = fb;

		Restangular.all('photos').getList().then(function (resp) {
			$scope.list = resp;
		});
	}]);

	mvCtrls.controller('sideCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$scope.b4 = 4444;
		$scope.is_logged_in = false;

		$scope.$on('login_success', function (e, user) {
			$scope.is_logged_in = true;
			$scope.user = user;
		});

		$scope.$on('$routeChangeSuccess', function (e, route) {
			$scope.path = route.$$route.originalPath;
		});
	}]);

	mvCtrls.controller('newCtrl', ['$scope', '$http', 'Restangular', 'User', function ($scope, $http, Restangular, User) {
		init_select2();

		var Gump = "Life was like a box of chocolates, you never know what you're gonna get.";
		$scope.upimgs = {};
		$scope.img_len = 0;
		$scope.is_preview = false;
		$scope.saying = Gump;
		$scope.movie_id = 0;

		Uploader(back_domain).finish(function (imgs, len) {
			$scope.upimgs = imgs;
			$scope.img_len = len;
			if($scope.is_preview) {
				$scope.preview();
			}
			$scope.$digest();
		});

		$scope.clear_desc = function () {
			if(Gump == $scope.saying)
				$scope.saying = '';
		}

		$scope.preview = function () {
			$scope.p = User.info();
			$scope.is_preview = true;
			fb();
		};

		$scope.submit = function () {
			var post = {
				saying: $scope.saying,
				movie_id: $scope.movie_id,
			};
			var imgurls = {}, i;

			if(!post.movie_id || !$scope.img_len) {
				return;
			}

			if(Gump == post.saying)
				post.saying = '';

			for(i in $scope.upimgs) {
				imgurls[i] = $scope.upimgs[i]['big'];
			}
			post['imgurls'] = imgurls;

			Restangular.all('photos').post(post).then(function (resp) {
				window.location = '/movie.html';
			});
		}
		
	}]);

	mvCtrls.controller('joinCtrl', [function () {
		
	}]);

	// select2 functions
	(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/zh-CN",[],function(){return{errorLoading:function(){return"无法载入结果。"},inputTooShort:function(e){var t=e.minimum-e.input.length,n="请输入关键字";return n},noResults:function(){return"未找到结果"},searching:function(){return"搜索中…"}}}),{define:e.define,require:e.require}})();

	function init_select2(){
		$('.mvs').select2({
			language: 'zh-CN',
			minimumInputLength: 1,
			ajax: {
				cache: true,
				url: 'http://api.douban.com/v2/movie/search',
				delay: 250,
				dataType: 'jsonp',
				jsonp: 'callback',
				data: function(params){
					return {
						q: params.term
					};
				},
				processResults: function(data, params) {
					$.post(back_domain + '/photo/import', {data:data.subjects});
					return {
						results: data.subjects
					};
				}
			},
			cache: true,
			templateResult: function(repo){
				if(repo.loading) return repo.text;

				return repo.title + '('+ repo.year +')';
			},
			templateSelection: function(repo){
				return repo.title + '('+ repo.year +')';
			}
		});
	}
})();