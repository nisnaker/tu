<?php

$start = 2532101;
$n = 0;

$filename = 'nick.txt';
touch($filename);
$f = fopen($filename, 'a');

while(true) {
	$id = $start + $n;
	$url = 'https://api.douban.com/v2/user/' . $id;
	$data = file_get_contents($url);
	$data = json_decode($data, true);
	// print_r($data);

	echo $n . ' : ' . $data['name'] . "\n";
	fwrite($f, $id . ' : ' . $data['name'] . "\n");

	$n++;
	if($n > 1000)
		break;
}

fclose($f);