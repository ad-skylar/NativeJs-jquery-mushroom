<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {
	
    public function index(){
        $this->display();
    }

    public function top(){
        $this->display();
    }

    public function down(){
        $this->display();
    }

    public function left(){

        // 获得当前管理员的session信息
        $admin_id = session('admin_id');
        $admin_name = session('admin_name');

        if($admin_name !== 'admin') {
            // 用户为普通管理员
            $roleinfo = D('Manager')
                ->alias('m')
                ->join('__ROLE__ as r on m.role_id=r.role_id')
                ->where(array('m.mg_id'=>$admin_id))
                ->find();
            $authids = $roleinfo['role_auth_ids'];
            // 获得auth权限信息
            $authinfoA = D('Auth')->where(array('auth_level'=>'0','auth_id'=>array('in',$authids)))->select();
            $authinfoB = D('Auth')->where(array('auth_level'=>'1','auth_id'=>array('in',$authids)))->select();
        } else {
            // 系统超级管理员
            $authinfoA = D('Auth')->where(array('auth_level'=>'0'))->select();
            $authinfoB = D('Auth')->where(array('auth_level'=>'1'))->select();
        }
        $this->assign('authinfoA',$authinfoA);
        $this->assign('authinfoB',$authinfoB);

        $this->display();
    }

    public function right(){
        $this->display();
    }

    public function center(){
        $this->display();
    }
}