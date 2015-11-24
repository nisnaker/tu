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

	mvCtrls.controller('listCtrl', ['$scope', function ($scope) {
		$scope.fb = fb;
		$scope.list = [
			{
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				user: {
					name: '黑崎一护',
					link: 'nulllink'
				},
				msg: {
					saying: '今天单位通知大家订新警服，然后来了两个裁缝，把我的三围、肩宽、身高、裤长都量了一遍。我一看，顿时觉得人民警察的待遇提高了，警服都给定做了！然后裁缝问：“去年定了什么号码，穿着合适吗？”我：“去年是190的，穿着有点大。”裁缝对另一个人说：“这个定185。”想不到裁缝也会冷笑话了。',
					pics: [
						{
							small:'http://img3.imgtn.bdimg.com/it/u=972117114,2268474951&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/150503/1283574_105541_9212.jpeg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=239499766,2487521660&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/110307/78_153917_1.jpg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=3139507190,2024793326&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/allimg/080726/13153545.jpg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=2558130604,2583706758&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/140226/1283568_141547_3297.jpg'
						},
						{
							small:'http://img4.imgtn.bdimg.com/it/u=1563807580,1393605228&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/080530/78_093630.jpg'
						}
					],
					created_at: '3分钟前'
				}
			},{
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				user: {
					name: '黑崎一护',
					link: 'nulllink'
				},
				msg: {
					saying: '今天单位通知大家订新警服，然后来了两个裁缝，把我的三围、肩宽、身高、裤长都量了一遍。我一看，顿时觉得人民警察的待遇提高了，警服都给定做了！然后裁缝问：“去年定了什么号码，穿着合适吗？”我：“去年是190的，穿着有点大。”裁缝对另一个人说：“这个定185。”想不到裁缝也会冷笑话了。',
					pics: [
						{
							small:'http://img3.imgtn.bdimg.com/it/u=972117114,2268474951&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/150503/1283574_105541_9212.jpeg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=239499766,2487521660&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/110307/78_153917_1.jpg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=3139507190,2024793326&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/allimg/080726/13153545.jpg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=2558130604,2583706758&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/140226/1283568_141547_3297.jpg'
						},
						{
							small:'http://img4.imgtn.bdimg.com/it/u=1563807580,1393605228&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/080530/78_093630.jpg'
						}
					],
					created_at: '3分钟前'
				}
			},{
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				user: {
					name: '黑崎一护',
					link: 'nulllink'
				},
				msg: {
					saying: '今天单位通知大家订新警服，然后来了两个裁缝，把我的三围、肩宽、身高、裤长都量了一遍。我一看，顿时觉得人民警察的待遇提高了，警服都给定做了！然后裁缝问：“去年定了什么号码，穿着合适吗？”我：“去年是190的，穿着有点大。”裁缝对另一个人说：“这个定185。”想不到裁缝也会冷笑话了。',
					pics: [
						{
							small:'http://img3.imgtn.bdimg.com/it/u=972117114,2268474951&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/150503/1283574_105541_9212.jpeg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=239499766,2487521660&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/110307/78_153917_1.jpg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=3139507190,2024793326&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/allimg/080726/13153545.jpg'
						},
						{
							small:'http://img0.imgtn.bdimg.com/it/u=2558130604,2583706758&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/140226/1283568_141547_3297.jpg'
						},
						{
							small:'http://img4.imgtn.bdimg.com/it/u=1563807580,1393605228&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/080530/78_093630.jpg'
						}
					],
					created_at: '3分钟前'
				}
			},
		];
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

	mvCtrls.controller('newCtrl', ['$scope', '$http', 'Restangular', function ($scope, $http, Restangular) {
		init_select2();

		var upimgs;
		$scope.is_preview = false;

		Uploader(back_domain).finish(function (imgs) {
			upimgs = imgs;
			if($scope.is_preview) {
				$scope.preview();
				$scope.$digest();
			}
		});

		$scope.preview = function () {
			$scope.p = {
				name: 'ame',
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				saying: $scope.saying,
				pics: upimgs,
				created_at: '几秒后'
			};
			$scope.is_preview = true;
		};

		$scope.submit = function () {
			
		}
		
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
					$.post(back_domain + '/movie/import', {data:data.subjects});
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