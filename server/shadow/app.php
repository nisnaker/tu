<?php

$_GET['_url'] = parse_url($_SERVER['REQUEST_URI'])['path'];

include 'config.php';
include 'funcs.php';

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
		// basic
		$this->get('/', function ()
		{
			header('Location: /movie.html');
		});

		$this->NotFound(function ()
		{
			$this->response
				->setStatusCode(404, "Not Found")
				->setContentType('application/json;charset=UTF-8')
				->sendHeaders();

			echo json(['error' => 'param error.']);
		});

		// user
		$user = new Collection();
		$user->setHandler('api\controller\UserController', true);

		$user->get('/user/active', 'active');
		$user->post('/api/users.json', 'create');
		$user->post('/api/token.json', 'login');
		$user->get('/user/logout', 'logout');
		$user->get('/api/user/status.json', 'status');

		$this->mount($user);

		
	}

	protected function registerEvents()
	{
		$this->before(function ()
		{
			// restangular post data
			$post_data = arr_get($GLOBALS, 'HTTP_RAW_POST_DATA', '[]');
			$_POST = json_decode($post_data, true);

			// page visit access
			$uri = $_GET['_url'];

			if(!$this->request->isAjax() &&
				!in_array($uri, ['/', '/user/active', '/user/logout']))
			{
				return false;
			}

			// checklogin
			if(!in_array($uri, ['/', '/api/users.json', '/api/token.json', '/user/logout', '/user/active']))
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
				$this->response
					->setContentType('application/json;charset=UTF-8')
					->sendHeaders();
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
