<?php

define('APP_DIR', '../server/');
define('SHADOW_DIR', APP_DIR . 'shadow/');
define('ENV', 'dev');

require SHADOW_DIR . 'app.php';

try {
	$app = new App();
	$app->run();
} catch(\Exception $e) {
	echo $e->getMessage();
}