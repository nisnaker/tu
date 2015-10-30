<?php

define('APP_PATH', realpath('../') . '/server/');

use Phalcon\Config\Adapter\Ini as ConfigIni;
use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Url as UrlProvider;
use Phalcon\Mvc\Application;
use Phalcon\DI\FactoryDefault;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;

try {

	$config = new ConfigIni(APP_PATH . 'conf/app.ini');

	$loader = new Loader();
	$loader->registerDirs([
		APP_PATH . $config->app->controllerDir,
		APP_PATH . $config->app->modelDir,
	])->register();

	$di = new FactoryDefault();

	$di->set('view', function () use ($config) {
		$view = new View();
		$view->setViewsDir(APP_PATH . $config->app->viewDir);
		return $view;
	});

	$di->set('db', function () use ($config) {
		return new DbAdapter([
			'host' => $config->db->db_host,
			'username' => $config->db->db_user,
			'password' => $config->db->db_pass,
			'dbname' => $config->db->db_name,
		]);
	});

	$app = new Application($di);

	echo $app->handle()->getContent();

} catch (\Exception $e) {
	header('Content-type: text/plain');
	print_r($e->getTrace()[0]);
}