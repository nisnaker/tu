<?php

function arr_get($arr, $key, $default = null)
{
	if(isset($arr[$key]))
		return $arr[$key];
	else
		return $default;
}