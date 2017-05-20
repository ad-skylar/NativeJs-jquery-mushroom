<?php
namespace Home\Controller;
use Think\Controller;

class TypeController extends Controller {

	// 列表展示
	function showlist() {
		
		// 获得类型列表信息
		$info = D('Type')->select();
		$this->assign('info',$info);
		$this->display();
	}

	// 添加类型
	function tianjia() {

		$type =D('Type');
		if(IS_POST) {
			$shuju = I('post.');
			if($type->add($shuju)) {
				$this->success('添加类型成功！',U('showlist'),2);
			} else {
				$this->error('添加类型失败',U('showlist'),2);
			}
		} else {
			$this->display();
		}
	}
}