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
	if(isset($arr[$key]))
		return $arr[$key];
	else
		return $default;
}


function json($arr)
{
	if(version_compare(PHP_VERSION, '5.4.0') >= 0)
		return json_encode($arr, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES);
	else
		return json_encode($arr);
}