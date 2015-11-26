<?php

namespace api\controller;

use \Photo;

class PhotoController extends BaseController {

	public function import()
	{
		$data = $this->request->getPost('data');
		
		if(!is_array($data)) return;

		\Subject::import($data);
		return [];
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

		$ext = substr($type, 6);
		if('jpeg' == $ext)
			$ext = 'jpg';
		$md5 = md5_file($upfile);
		$filename = $md5 . '.' . $ext;
		$tofile = $target_dir . $filename;

		if(file_exists($tofile) ||
			move_uploaded_file($upfile, $tofile))
		{	
			unset($ret['error']);
			$ret['result'] = 'http://' . DOMAIN . '/' . $tofile;
			// resize($tofile, 1600, 900, $target_dir . $md5 . '_s.' . $ext);
			return $ret;
		} else {
			return $ret;
		}
	}

	public function create()
	{
		$imgs = [];

		$path = 'uploads/img/' . date('Y/m/d/');
		if(!is_dir($path))
			mkdir($path, 0777, true);

		foreach ($_POST['imgurls'] as $imgurl)
		{
			$file = parse_url($imgurl)['path'];
			$file = substr($file, 1);
			
			$md5 = md5_file($file);
			$ext = '.' . substr($file, -3);
			$small = $path . $md5 . '_s' . $ext;
			$big = $path . $md5 . $ext;

			if(!file_exists($big))
				copy($file, $big);

			if(!file_exists($small))
				resize($file, 0, 170, $small);

			$imgs[] = ['small' => $small, 'big' => $big];
		}

		$photo = new Photo();
		$photo->userid = $this->user['userid'];
		$photo->saying = $_POST['saying'];
		$photo->subject_id = $_POST['movie_id'];
		$photo->imgs = $imgs;
		$photo->save();

		return [];
	}

	public function get()
	{
		$data = Photo::find([[], 'sort' => ['created_at' => -1]]);
		$data = Photo::format($data);
		return $data;
	}
}