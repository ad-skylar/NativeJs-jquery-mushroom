<?php
namespace Home\Controller;
use Think\Controller;

class ManagerController extends Controller {
	
    public function login(){

    	if(IS_POST) {
    		// 验证码校验
    		$code = I('post.manager_verify');
    		$vry = new \Think\Verify();
    		if($vry->check($code)) {

                // 检验用户名和密码
                $name = I('post.manager_name');
                $pwd = md5(I('post.manager_pwd'));

                // 根据$name和$pwd为条件，去查询是否存在对应的管理员信息
                // 返回：array || null
                $info = D('Manager')->where(array('mg_name'=>$name,'mg_pwd'=>$pwd))->find();
                if($info) {
                    session('admin_id',$info['mg_id']);
                    session('admin_name',$info['mg_name']);

                    // 页面跳转
                    $this->redirect('Index/index');
                } else {
                    $this->assign('errorinfo','用户名或密码错误');
                }

    		} else {
    			$this->assign('errorinfo','验证码错误');
    		}
    	}
        $this->display();
    }

    // 退出系统
    function logout() {
        session(null);
        $this->redirect('Manager/login');
    }

    // 生成验证码
    function verifyImg() {

    	$cfg = array(
    		'fontSize' => 20,
    		'useCurve' => false,
    		'useNoise' => true,
    		'imageH' => 42,
    		'imageW' => 150,
    		'length' => 4,
    		'fontttf' =>'4.ttf',
    	);
    	$vry = new \Think\Verify($cfg);
    	$vry->entry();
    }
}