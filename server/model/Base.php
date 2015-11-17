<?php

// collection基类
abstract class Base extends Phalcon\Mvc\Collection {

	// 输出属性
	public function attrs()
	{
		$arr = [];
		foreach ($this->_attrs as $k)
		{
			$arr[$k] = $this->$k;
		}

		return $arr;
	}

	public function beforeCreate() { $this->created_at = date('Y-m-d H:i:s'); }
	public function beforeUpdate() { $this->updated_at = date('Y-m-d H:i:s'); }
}