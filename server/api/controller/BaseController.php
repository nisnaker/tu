<?php

namespace api\controller;

abstract class BaseController extends \Phalcon\Mvc\Controller {

	public function onConstruct()
	{
		$userid = \User::check_token();
		$user = \User::findFirst([['userid' => $userid]]);
		if($user)
			$this->user = $user->attrs();
	}
}