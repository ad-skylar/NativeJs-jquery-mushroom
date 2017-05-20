<?php
namespace Admin\Model;
use Think\Model;

class RoleModel extends Model {
	
	// 给角色更新权限
	function saveAuth($role_id,$auth_id) {
		// ①维护role_auth_ids信息
		$auth_ids = implode(',', $auth_id);

		// ②维护role_auth_ac信息
		$authinfo = D('Auth')->where(array(
			'auth_level'=>array('gt','0'),
			'auth_id'=>array('in',$auth_ids)
			))->select();
		$s = array();
		foreach($authinfo as $k=>$v) {
			$s[] = $v['auth_c'].'-'.$v['auth_a'];
		}
		$ac = implode(',',$s);
		$arr = array(
			'role_id'=>$role_id,
			'role_auth_ids'=>$auth_ids,
			'role_auth_ac'=>$ac
			);
		return $this->save($arr);
	}
}