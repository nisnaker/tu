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
							small:'http://img3.imgtn.bdimg.com/it/u=2169951136,2632191663&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/130206/1283568_140109_1237.jpg'
						},
						{
							small:'http://img1.imgtn.bdimg.com/it/u=957109687,2478546600&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/111114/391819_102757_1_lit.jpg'
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
							small:'http://img3.imgtn.bdimg.com/it/u=2169951136,2632191663&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/130206/1283568_140109_1237.jpg'
						},
						{
							small:'http://img1.imgtn.bdimg.com/it/u=957109687,2478546600&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/111114/391819_102757_1_lit.jpg'
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
							small:'http://img3.imgtn.bdimg.com/it/u=2169951136,2632191663&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/130206/1283568_140109_1237.jpg'
						},
						{
							small:'http://img1.imgtn.bdimg.com/it/u=957109687,2478546600&fm=21&gp=0.jpg',
							big: 'http://pic2.52pk.com/files/111114/391819_102757_1_lit.jpg'
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

		$scope.movie_id = 0;
		$scope.mvs = [{title: '输入关键字回车搜索', id: 0}];
		window.movie = function (re) {
			$scope.mvs = re.subjects;
			$scope.movie_id = re.subjects[0]['id'];
		}
		$scope.search = function () {
			$http({method: 'JSONP', data: {}, url: 'http://api.douban.com/v2/movie/search?callback=movie&q=' + $scope.search_key}).success(function (data, status) {
				l(data)
			}).error(function (data, status) {
				l(data)
			});
		}
	}]);

})();