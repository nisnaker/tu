<?php


$url = 'http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&word=头像&pn=%d&rn=60&gsm=%s';


$n = 60;
$gsm = '3c';

$filename = 'baidu_avatar.txt';
touch($filename);
$f = fopen($filename, 'a');

while($n < 1061) {
	$url = "http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&word=头像&pn={$n}&rn=60&gsm=" . $gsm;
	
	$data = file_get_contents($url);
	$data = json_decode($data, true);

	$gsm = $data['gsm'];

	foreach ($data['imgs'] as $d) {
		$n++;
		$imgsrc = $d['thumbURL'];
		fwrite($f, $imgsrc . "\n");
	}

	echo $n . "\n";
}


fclose($f);
