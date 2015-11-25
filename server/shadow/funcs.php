<?php

// 处理跨域OPTIONS请求问题

function cors_options()
{
	header('Access-Control-Allow-Origin: http://' . FRONT_DOMAIN);
	header('Access-Control-Allow-Credentials: true');

	if('OPTIONS' != $_SERVER['REQUEST_METHOD']) return;

	header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE');
	header('Access-Control-Max-Age: ' . 3600 * 24);

	exit;
}

cors_options();


function arr_get($arr, $key, $default = null)
{
	$keys = explode('|', $key);
	foreach ($keys as $k)
	{
		if(array_key_exists($k, $arr))
			$arr = $arr[$k];
		else
			return $default;
	}

	return $arr;
}


function json($arr)
{
	if(version_compare(PHP_VERSION, '5.4.0') >= 0)
		return json_encode($arr, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES);
	else
		return json_encode($arr);
}

function resize($file, $max_width = 0, $max_height = 0, $newfile = '')
{
	if(!$max_width && !$max_height)
		return;

	$info = getimagesize($file);
	$w = $info[0];
	$h = $info[1];
	$type = $info[2]; // 1 为 GIF 格式、 2 为 JPEG/JPG 格式、3 为 PNG 格式

	// 图片大小正常，不用压缩
	if($w < $max_width && $h < $max_height)
	{
		if($newfile)
			copy($file, $newfile);
		return;
	}

	$rate = $w / $h;
	if(0 == $max_width)
	{
		// 有高度限制，宽度自由
		$h2 = $max_height;
		$w2 = $h2 / $h * $w;
	}
	elseif(0 == $max_height)
	{
		// 有宽度限制，高度自由
		$w2 = $max_width;
		$h2 = $w2 / $w * $h;
	}
	else
	{
		// 宽高都限制
		$rate2 = $max_width / $max_height;
		if($rate > $rate2) {
			$w2 = $max_width;
			$h2 = $w2 / $w * $h;
		} else {
			$h2 = $max_height;
			$w2 = $h2 / $h * $w;
		}
	}

	$funcs = [
		1 => ['imagecreatefromgif', 'imagegif'],
		2 => ['imagecreatefromjpeg', 'imagejpeg'],
		3 => ['imagecreatefrompng', 'imagepng'],
	];

	$img = $funcs[$type][0]($file);

	$newimg = imagecreatetruecolor($w2, $h2);
	if(function_exists('imagecopyresampled'))
	{
		imagecopyresampled($newimg, $img, 0, 0, 0, 0, $w2, $h2, $w, $h);
	}
	else
	{
		imagecopyresized($newimg, $img, 0, 0, 0, 0, $w2, $h2, $w, $h);
	}

	if(!$newfile)
		$newfile = $file;

	if(2 == $type)
		$funcs[$type][1]($newimg, $newfile, 100);
	else
		$funcs[$type][1]($newimg, $newfile);

	imagedestroy($img);
	imagedestroy($newimg);
}