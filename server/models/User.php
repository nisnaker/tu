<?php

/*
SQL:

CREATE TABLE 'users' (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(70) NOT NULL,
	`email` varchar(70) NOT NULL,
	PRIMARY KEY (`id`)
);

*/

use Phalcon\Mvc\Model;

class User extends Model
{

}