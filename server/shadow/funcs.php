<?php

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