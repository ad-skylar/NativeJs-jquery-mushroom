<?php
namespace Home\Controller;
use Think\Controller;

class RoleController extends Controller {
	// 列表展示
	function showlist() {

		// 获得角色列表信息
		$info = D('Role')->select();
		$this->assign('info',$info);

		$this->display();
	}

	// 分配权限
	function distribute() {

		if(IS_POST) {
			$role_dis_id = session('role_dis_id');
			// 判断form表单的role_id隐藏域信息没有被篡改
			if($role_dis_id===$_POST['role_id']) {
				// ①收集表单入库
				$role = D('Role');
				$z = $role->saveAuth($_POST['role_id'],$_POST['auth_id']);	// 给角色更新权限
				if($z) {
					$this->success('分配权限成功',U('showlist'),2);
				} else {
					$this->error('分配权限失败',U('distribute',array('role_id'=>$_POST['role_id'])),2);
				}
			} else {
				$this->error('相关参数出现问题，请联系管理员',U('showlist'),2);
			}
		} else {
			// 获得被分配权限角色的role_id和详细信息
			$role_id = I('get.role_id');
			$roleinfo = D('Role')->find($role_id);
			$this->assign('roleinfo',$roleinfo);

			// 把被分配的权限的角色role_id存储给session
			session('role_dis_id',$role_id);

			// 把可用于分配的权限信息获得出来并传递给模板展示
			// 分别获得父子级权限
			$authinfoA = D('Auth')->where(array('auth_level'=>'0'))->select();
			$authinfoB = D('Auth')->where(array('auth_level'=>'1'))->select();
			$this->assign('authinfoA',$authinfoA);
			$this->assign('authinfoB',$authinfoB);
			$this->display();
		}
		
	} 

}