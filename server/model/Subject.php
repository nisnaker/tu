<?php

class Subject extends Base {

	public function getSource() { return 'subject'; }

	static public function import($data)
	{
		// id字段创建唯一索引
		// db.movie.createIndex({id:1}, {unique:1});

		$di = \Phalcon\DI::getDefault();
		$di->get('mongo')->subject->batchInsert($data, ['continueOnError' => true]);
	}
}