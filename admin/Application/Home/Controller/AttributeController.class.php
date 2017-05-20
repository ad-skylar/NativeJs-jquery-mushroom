<?php
namespace Home\Controller;
use Think\Controller;

class AttributeController extends Controller {

	// 列表展示
	function showlist() {
		/*
		// 获得属性列表信息
		$info = D('Attribute')
			->alias('a')
			->join('__TYPE__ t on a.type_id=t.type_id')
			->field('a.*,t.type_name')
			->select();
		$this->assign('info',$info);
		*/
	
		// 获取下达列表展示的商品类型信息
		$typeinfo = D('Type')->select();
		$this->assign('typeinfo',$typeinfo);
		$this->display();
	}
	// 添加属性
	function tianjia() {

		$Attribute = D('Attribute');
		if(IS_POST) {
			$shuju = $Attribute->create();
			if($shuju !== false) {
				// 把可选值的"中文逗号"替换为"英文逗号"
				$shuju['attr_vals'] = str_replace('，', ',', $shuju['attr_vals']);

				if($Attribute->add($shuju)) {
					$this->success('添加类型成功',U('showlist'),2);
				}else {
					$this->error('添加类型失败',U('showlist'),2);
				}exit;
			} else {
				// 验证出现问题
				$this->assign('errorinfo',$Attribute->getError());
			}
		} 
		// 获取可供选取的商品类型信息
		$typeinfo = D('Type')->select();
		$this->assign('typeinfo',$typeinfo);

		$this->display();
		
	}

	// 根据类型type_id获得对应的属性列表信息
	function getAttrInfoByType(){
        if(IS_AJAX){
            //获取传递过来的类型type_id
            $type_id = I('get.type_id');
			//根据$type_id获取对应的属性列表信息
            if($type_id>0) {
            	// 获得具体类型的属性信息
	            $info = D('Attribute')
	                ->alias('a')
	                ->join('__TYPE__ t on a.type_id=t.type_id')
	                ->field('a.*,t.type_name')
	                ->where(array('a.type_id'=>$type_id))
	                ->select();
            } else {
            	// 获得全部的属性信息
            	$info = D('Attribute')
	                ->alias('a')
	                ->join('__TYPE__ t on a.type_id=t.type_id')
	                ->field('a.*,t.type_name')
	                ->select();
            }
            echo json_encode($info);
        }
    }
}