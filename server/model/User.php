<?php

use Phalcon\Mvc\Model\Validator\Email as EmailValidator;

class User extends Base {
	
	protected $_attrs = ['email', 'status'];

	public function getSource() { return 'user'; }
	
	public function beforeCreate() {
		parent::beforeCreate();
		$this->status = 2; // 未激活
		$this->userid = $this->_uniqid();
	}
	
	public function validation()
	{
		$this->validate(new EmailValidator([
			'field' => 'email'
		]));

		if($this->validationHasFailed() == true)
		{
			return false;
		}
	}

	private function _uniqid()
	{
		$str = '0123456789abcdefghijklmnopqrstuvwxyz';

		while(true)
		{
			$id = '';
			for($i = 0; $i < 6; $i++)
			{
				$index = rand(0, 35);
				$id .= $str{$index};
			}

			$user = self::findFirst([['userid' => $id]]);
			if(!$user)
				return $id;
		}
	}

	public function gen_token()
	{
		$time = dechex(time() - EPOCH);
		$val = $this->userid . $time;
		$token = sprintf('%s.%s.%s',
			$this->userid,
			$time,
			hash_hmac('sha256', $val, CRYPT_KEY)
		);

		return $token;
	}

	public function check_token($token)
	{
		return true;
	}
}