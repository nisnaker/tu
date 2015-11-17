<?php

namespace api\controller;

use \User;
use Phalcon\Security;

class UserController extends \Phalcon\Mvc\Controller {

	public function index()
	{
		echo 'user page index';
	}

	public function create()
	{
		$email = $this->request->getPost('email');
		$passwd = $this->request->getPost('passwd');

		$user = User::findFirst([['email' => $email]]);
		if($user)
			return $user->attrs();

		$security = new Security();

		$user = new User();
		$user->email = $email;
		$user->passwd = $security->hash($passwd);
		if($user->save())
			return $user->attrs();
		else
			return 'error';
	}

	public function active()
	{
		var_dump($this->request->isAjax());
		print_r($_COOKIE);

		$email = $this->request->get('email');

		$user = User::findFirst([[ 'email' => $email]]);
		if($user && 2 == $user->status)
		{
			$user->status = 1; // 激活
			$user->save();

			$this->login();
		} else {
			// echo 'error';
		}

		$this->login();
		return [1];
	}

	public function login()
	{
		var_dump($this->request->isPost());
		var_dump($this->request->isAjax());
		$email = $this->request->getPost('email');
		$passwd = $this->request->getPost('passwd');
		$rem_me = $this->request->getPost('rem_me');

		$user = User::findFirst([['email' => $email]]);
		if($user)
		{
			$security = new Security();
			if($security->checkHash($passwd, $user->passwd))
			{
				$token = $user->gen_token();
				setcookie('token', $token, time() + 3600 * 24 * 30, '/');

				return $user->attrs();
			}
			else
			{
				return 'error';
			}
		}

		return 'error';
	}
}

// 