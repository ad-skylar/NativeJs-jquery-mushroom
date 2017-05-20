<?php
namespace Home\Common;
use Think\Controller;

class AdminController extends Controller {

	// 构造方法
	function __construct() {

		parent::__construct();// 避免覆盖父类构造方法

		$admin_id = session('admin_id');
		$admin_name = session('admin_name');

		// 当前访问的控制器-操作方法
		$nowAC = CONTROLLER_NAME."-".ACTION_NAME;
		$roleinfo = D('Manager')
			->alias('m')
			->join('__ROLE__ as r on m.role_id=r.role_id')
			->field('r.role_auth_ac')
			->where(array('m.mg_id'=>$admin_id))
			->find();

		$have_auth = $roleinfo['role_auth_ac'];

		// 系统默认允许访问的权限（无需分配）
		$allow_auth = "Manager-login,Manager-logout,Manager-verifyImg,Index-top,Index-left,Index-center,Index-down,Index-right,Index-index";

		if(strpos($have_auth, $nowAC)===false && strpos($allow_auth,$nowAC)===false && $admin_name!=='admin') {
			exit('没有权限访问');
		}
	}
}