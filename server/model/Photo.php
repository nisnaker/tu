<?php

class Photo extends Base {
	public function getSource() { return 'photo'; }

	public function beforeCreate() {
		parent::beforeCreate();
		$this->status = 1;
	}
}