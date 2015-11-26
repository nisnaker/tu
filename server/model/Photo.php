<?php

class Photo extends Base {
	
	protected $_attrs = ['id', 'saying', 'imgs', 'created_at'];

	public function getSource() { return 'photo'; }

	public function beforeCreate() {
		parent::beforeCreate();
		$this->status = 1;
		$this->id = uniqid();
	}

	static public function format($data)
	{
		$uids = $sids = [];
		$users = $subjects = [];

		foreach ($data as $d)
		{
			$uids[] = $d->userid;
			$sids[] = $d->subject_id;
		}

		$uids = array_unique($uids);
		$ret = \User::find([['userid' => ['$in' => $uids]]]);
		foreach ($ret as $u)
		{
			$users[$u->userid] = $u->attrs();
		}

		$sids = array_unique($sids);
		$ret = \Subject::find([['id' => ['$in' => $sids]]]);
		foreach ($ret as $s)
		{
			$subjects[$s->id] = $s->attrs();
		}

		$ret = [];
		foreach ($data as $d)
		{
			$ret[] = [
				'id' => $d->id,
				'saying' => $d->saying,
				'imgs' => $d->imgs,
				'author' => $users[$d->userid],
				'subject' => $subjects[$d->subject_id],
				'created_at' => $d->created_at
			];
		}

		return $ret;

		print_r($users);
		print_r($subjects);

		print_r($uids);
		print_r($sids);

		return [];
	}
}