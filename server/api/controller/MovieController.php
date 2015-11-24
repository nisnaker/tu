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
		@set_time_limit(300);

		$ret = [
			'jsonrpc' => '2.0',
			'error' => [
				'code' => 101,
				'message' => '上传出错'
			],
			'id' => 'id'
		];
	
		$target_dir = 'uploads/tmp/' . date('Y/m/d/');
		if(!is_dir($target_dir))
			mkdir($target_dir, 0777, true);

		$type = arr_get($_REQUEST, 'type', 'image/jpeg');
		$upfile = arr_get($_FILES, 'file|tmp_name', '');
		if(!$type || !$upfile || 'image' != substr($type, 0, 5))
			return $ret;

		$filename = md5_file($upfile) . '.' . substr($type, 6);
		$tofile = $target_dir . $filename;

		if(file_exists($tofile) ||
			move_uploaded_file($upfile, $tofile))
		{	
			unset($ret['error']);
			$ret['result'] = '/' . $tofile;
			return $ret;
		} else {
			return $ret;
		}
	}
}