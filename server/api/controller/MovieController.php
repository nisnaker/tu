<?php

namespace api\controller;

class MovieController extends BaseController {

	public function import()
	{
		// id字段创建唯一索引
		// db.movie.createIndex({id:1}, {unique:1});

		$data = $this->request->getPost('data');
		
		if(!is_array($data)) return;

		$re = $this->mongo->movie->batchInsert($data, ['continueOnError' => true]);
	}

	public function upload()
	{
		return [];
	}
}