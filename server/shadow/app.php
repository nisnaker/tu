<?php

$_GET['_url'] = parse_url($_SERVER['REQUEST_URI'])['path'];

include 'config.php';
include 'funcs.php';

header('Content-Type: application/json;charset=UTF-8');

use Phalcon\Mvc\Micro\Collection as Collection;

class App extends Phalcon\Mvc\Micro {

	protected function registerAutoloaders()
	{
		$loader = new Phalcon\Loader();

		$loader->registerNamespaces([
			'api' => APP_DIR . 'api'
		]);

		$loader->registerDirs([
			APP_DIR . 'model'
		]);

		$loader->register();
	}

	protected function registerServices()
	{
		$di = new Phalcon\DI();

		$di->set('mongo', function ()
		{
			$mongo = new MongoClient(MONGO_DSN);
			return $mongo->selectDB(MONGO_DB);
		});

		$di->set('router', 'Phalcon\Mvc\Router', true);
		$di->set('request', 'Phalcon\Http\Request', true);
		$di->set('response', 'Phalcon\Http\Response', true);
		$di->set('collectionManager', 'Phalcon\Mvc\Collection\Manager', true);

		$this->setDI($di);
	}

	protected function registerRouters()
	{
		$should_login = [];

		// basic
		$this->get('/', function ()
		{
			header('Location: /movie.html');
		});

		$this->NotFound(function ()
		{
			$this->response->setStatusCode(404, "Not Found")->sendHeaders();
			echo json(['error' => 'param error.']);
		});

		// user
		$user = new Collection();
		$re = $user->setHandler('api\controller\UserController', true);
		$user->setPrefix('/api/users');

		$user->get('/status', 'status')
			->post('/token', 'login')
			->get('/logout', 'logout')
			->get('/active', 'active')
			->post('', 'create');

		$this->mount($user);

		// photo

		$photo = new Collection();
		$photo->setHandler('api\controller\PhotoController', true);
		$photo->setPrefix('/api/photos');

		$photo->get('', 'get')
			->post('', 'create')
			->post('/upload', 'upload')
			->post('/import', 'import');

		$this->mount($photo);

		$this->should_login = $should_login;
	}

	protected function registerEvents()
	{
		$this->before(function ()
		{
			// restangular post data

			if(!$_POST)
			{
				if(stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
					$_POST = json_decode(file_get_contents("php://input"), true);
				}
			}

			// page visit access
			$uri = $_GET['_url'];

			// if(!$this->request->isAjax() &&
			// 	!in_array($uri, ['/', '/user/active', '/movie/upload']))
			// {
			// 	echo 'params error';
			// 	return false;
			// }

			// checklogin
			if(in_array($uri, $this->should_login))
			{
				$userid = \User::check_token();
				if(!$userid)
				{
					echo '[]';
					return false;
				}
			}

		});



		$this->finish(function ()
		{
			$output = $this->getReturnedValue();
			if(is_string($output))
				$output = ['error' => $output];

			if(is_array($output))
			{
				echo json($output);
			}
		});
	}

	public function run()
	{
		$this->registerServices();
		$this->registerAutoloaders();
		$this->registerRouters();
		$this->registerEvents();

		$this->handle();
	}
}
