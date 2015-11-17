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

		$di->set('router', function ()
		{
			return new Phalcon\Mvc\Router();
		});

		$di->set('request', function ()
		{
			return new Phalcon\Http\Request();
		});

		$di->set('response', function ()
		{
			return new Phalcon\Http\Response();
		});

		$di->set('collectionManager', function ()
		{
			return new Phalcon\Mvc\Collection\Manager();
		});

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

		$this->mount($user);

		
	}

	protected function registerEvents()
	{
		$this->before(function ()
		{
			$post_data = arr_get($GLOBALS, 'HTTP_RAW_POST_DATA', '[]');
			$_POST = json_decode($post_data, true);

			return true;
		});

		$this->finish(function ()
		{
			$output = $this->getReturnedValue();
			if('error' == $output)
				$output = ['error' => 'param error.'];

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
