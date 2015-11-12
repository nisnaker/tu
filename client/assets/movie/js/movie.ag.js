(function () {
	'use strict';

	var movie = angular.module('jietu8', ['app.core', 'mvCtrls']);

	movie.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/list/:id', {
				templateUrl: '/tpls/movie/tpls/list.html',
				controller: 'listCtrl'
			});
		// .otherwise({
		// 		// redirectTo: '/list/1'
		// 	});
	}]);

	movie.run(['$rootScope', function ($rootScope) {
		$rootScope.page = {
			title: '电影截图',
			name: 'movie'
		};
	}]);

	var mvCtrls = angular.module('mvCtrls', []);

	mvCtrls.controller('listCtrl', ['$scope', function ($scope) {
		$scope.list = [
			{
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				user: {
					name: '乔峰',
					link: 'nulllink'
				},
				msg: {
					saying: '这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。',
					pics: [
						'http://img4.douban.com/view/photo/thumb/public/p2178322456.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2182634038.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p1983161248.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2186559168.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2183467068.jpg'
					],
					created_at: '3分钟前'
				}
			},{
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				user: {
					name: '乔峰',
					link: 'nulllink'
				},
				msg: {
					saying: '这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。',
					pics: [
						'http://img4.douban.com/view/photo/thumb/public/p2178322456.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2182634038.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p1983161248.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2186559168.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2183467068.jpg'
					],
					created_at: '3分钟前'
				}
			},{
				avatar: 'http://img2.imgtn.bdimg.com/it/u=1341923083,1900907467&fm=23&gp=0.jpg',
				user: {
					name: '乔峰',
					link: 'nulllink'
				},
				msg: {
					saying: '这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。这两天到十字路口烧各种黄纸、冥币的人特别多，于是市政府在各个路口都放了一个大香炉为大家烧纸，下班时看着大家在香炉前排队的样子，依稀有种在银行柜台前排队汇款的感觉。',
					pics: [
						'http://img4.douban.com/view/photo/thumb/public/p2178322456.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2182634038.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p1983161248.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2186559168.jpg',
						'http://img4.douban.com/view/photo/thumb/public/p2183467068.jpg'
					],
					created_at: '3分钟前'
				}
			},
		];
	}]);

})();