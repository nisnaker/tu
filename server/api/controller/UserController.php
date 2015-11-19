<?php

namespace api\controller;

use \User;
use Phalcon\Security;

class UserController extends BaseController {

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
			return '邮箱已存在，可以直接登入';

		$security = new Security();

		$user = new User();
		$user->email = $email;
		$user->passwd = $security->hash($passwd);
		if($user->save())
			return $user->attrs();
		else
			return '已暂停注册';
	}

	public function active()
	{
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
		$email = $this->request->getPost('email');
		$passwd = $this->request->getPost('passwd');
		$rem_me = $this->request->getPost('rem_me');

		$user = User::findFirst([['email' => $email]]);
		if($user)
		{
			$security = new Security();
			if($security->checkHash($passwd, $user->passwd))
			{
				if(2 == $user->status)
					return '账号未激活，请前往激活';

				$token = $user->gen_token();
				$expire = $rem_me ? (time() + 3600 * 24 * 30) : 0;
				setcookie('token', $token, $expire, '/', DOMAIN, false, true);
				
				return $user->attrs();
			}
			else
			{
				return '账号或密码错误';
			}
		}

		return '账号或密码错误';
	}

	public function logout()
	{
		setcookie('token', '', 1, '/', DOMAIN, false, true);
		return [];
	}

	public function status()
	{
		return $this->user;
	}
}

// 