<?php
namespace Home\Controller;
use Think\Controller;

class PersonalController extends Controller {

    // 展示前台注册用户
    function showlist() {
        $personal = D('personal')->order('ID desc')->select();
        $this->assign('personal',$personal);
        $this->display();
    }

    // 删除用户
    function del($id) {

            $person = D('Personal');
            if(!empty($_GET)) {
                $z = $person->delete($id);
                if($z) {
                    $this->redirect('showlist',array(),1,'删除用户成功！');
                } else {
                    $this->redirect('showlist',array(),1,'删除用户失败！');
                }
            }
        }
}