<?php

namespace api\controller;
use \User as User;

class UserController extends \Phalcon\Mvc\Controller {

	public function index()
	{
		echo 'user page index';
	}

	public function create()
	{
		print_r($_POST);

		$email = arr_get($_POST, 'email');
		var_dump($email);
		$user = User::findFirst([['email' => $email]]);
		var_dump($user);
		return ['a' => '哈哈'];
	}
}