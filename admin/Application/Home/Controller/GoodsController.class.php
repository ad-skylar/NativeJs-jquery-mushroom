<?php
namespace Home\Controller;
use Think\Controller;

class GoodsController extends Controller {
	
    public function showlist(){

        // 获得商品列表信息
        // D函数用来实例化数据库模型类，在这里就是实例化Goods表
        $info = D('Goods')->order('goods_id')->select();
        $this->assign('info',$info);
        $this->display();
    }

    // 添加商品
    public function tianjia(){

        $goods = D('Goods');
        if(IS_POST) {

            // 给商品实现logo图片上传
            $this->deal_logo();
            // 普通信息通过I()收集
            $shuju = I('post.');

            // 富文本编辑信息不使用I()收集
            $shuju['goods_introduce'] = \fangXSS($_POST['goods_introduce']);
            // 维护时间字段
            $shuju['add_time'] = $shuju['upd_time'] = time();
            if($newid = $goods->add($shuju)) {

                // 相册维护
                $this->deal_pics($newid);
                // 属性信息维护
                $this->deal_attr($newid);

                $this->success('添加商品成功',U('showlist'),2);
            } else {
                $this->error('添加商品失败',U('tianjia'),2);
            }
        } else {

            // 展示表单
            // 获取类型信息
            $typeinfo = D('Type')->select();
            $this->assign('typeinfo',$typeinfo);

            $shuju = I('post.');
            $this->display();
        }
    }

    // 实现相册上传维护
    private function deal_pics($goods_id) {
        // 判断是否有上传相册
        $havePics = false;
        foreach ($_FILES['goods_pics']['error'] as $v) {
            if($v === 0) {
                $havePics = true;
                break;
            }
        }
        // 有上传相册才处理
        if($havePics === true) {
            // 保存根路径
            $cfg2 = array(
                'rootPath' => './admin/Public/Uploads/pics/',
            );
            $up2 = new \Think\Upload($cfg2);

            // 相册批量上传处理，upload(二维数组)
            $z2 = $up2->upload(array($_FILES['goods_pics']));

            // 给相册制作缩略图，遍历$z2获得每个已经上传好的相册图片
            $im2 = new \Think\Image();
            foreach ($z2 as $k => $v) {
                // 获得原相册路径名
                $yuan_pics = $up2->rootPath.$v['savepath'].$v['savename'];
                // 打开原图
                $im2->open($yuan_pics);
                 //缩略图范围：800*800   350*350   50*50
                //同一个原图可以同时制作多个大小不同的缩略图
                //要求：缩略图由大到小的顺序制作

                // 大图
                $im2->thumb(800,800,6);
                $pics_big = $up2->rootPath.$v['savepath'].'big_'.$v['savename'];
                // 存储缩略图
                $im2->save($pics_big);

                // 中图
                $im2->thumb(350,350,6);
                $pics_mid = $up2->rootPath.$v['savepath'].'mid_'.$v['savename'];
                $im2 -> save($pics_mid);

                // 小图
                $im2->thumb(50,50,6);
                $pics_sma = $up2->rootPath.$v['savepath'].'sma_'.$v['savename'];
                 $im2->save($pics_sma);

                // 删除无用的原图
                unlink($yuan_pics);

                // 把缩略图相册存储给数据库
                $arr = array(
                    'goods_id'=>$goods_id,
                    'pics_big'=>$pics_big,
                    'pics_mid'=>$pics_mid,
                    'pics_sma'=>$pics_sma,
                );
                D('GoodsPics')->add($arr);
            }
        }
    }

    // 添加商品实现属性信息的维护
    private function deal_attr($goods_id) {

        // 如果是修改商品，维护属性信息，则要删除旧属性
        D('GoodsAttr')->where(array('goods_id'=>$goods_id))->delete();
        foreach ($_POST['attr_info'] as $k => $v) {
            foreach ($v as $vv) {
                if(!empty($vv)) {
                    $arr['goods_id'] = $goods_id;
                    $arr['attr_id'] = $k;
                    $arr['attr_value'] = $vv;
                    D('GoodsAttr')->add($arr);
                }
            }
        }
    } 

    // 实现商品logo上传处理
    private function deal_logo($goods_id=0) {

        // 给商品实现Logo图片上传
        if($_FILES['goods_logo']['error']===0) {
            // 修改商品时，要把该商品之前的logo图片文件删除
            if($goods_id !== 0) {
                $goodsinfo = D('Goods')->find($goods_id);
                if(file_exists($goodsinfo['goods_big_logo'])) {
                    unlink($goodsinfo['goods_big_logo']);
                }
                if(file_exists($goodsinfo['goods_small_logo'])) {
                    unlink($goodsinfo['goods_small_logo']);
                }
            }

            // 有正常附件上传
            $cfg = array(
                           'rootPath' => './Public/Uploads/logo/',  // 保存根路径
                       );
                       $up = new \Think\Upload($cfg);
                       // 返回值为附件的上传子目录和名字信息
                       $z = $up->uploadOne($_FILES['goods_logo']);
                       // 把上传好的附件存储给数据库，存储附件的路径名
                       $_POST['goods_big_logo'] = $up->rootPath.$z['savepath'].$z['savename'];

                       // 对Logo图片制作缩略图
                       $im = new \Think\Image();
                       // 找到被处理原图并打开
                       $im->open($_POST['goods_big_logo']);
                       // 制作缩略图
                       $im->thumb(130,130,6);
                       // 制作好的缩略图存储到服务器
                       $smallPathName = $up->rootPath.$z['savepath'].'small_'.$z['savename'];
                       $im->save($smallPathName);

                       // 缩略图存储到数据库
                       $_POST['goods_small_logo'] = $smallPathName;
                   }
    }

    // 修改商品
    public function upd(){

        if(IS_POST) {

            // 把先前设置好的session的goods_id获得
            $goods_upd_id = session('goods_upd_id');

            // 判断From表单的隐藏域的goods_id是否被修改
            if($goods_upd_id === $_POST['goods_id']) {
            
                // 商品logo图片修改处理
                $this->deal_logo($_POST['goods_id']);
                // 商品相册图片上传处理
                $this->deal_pics($_POST['goods_id']);
                // 实现属性信息收集入库
                $this->deal_attr($_POST['goods_id']);
                // 收集表单
                $shuju = I('post.');
                //更新upd_time修改时间字段
                $shuju['upd_time'] = time();

                // 要直接收集原生的富文本编辑器信息
                // 使用fangXss()函数实现信息的过滤处理
                $shuju['goods_introduce'] = \fangXSS($_POST['goods_introduce']);
                if(D('Goods')->save($shuju)) {
                    $this->success('修改商品成功',U('showlist'),2);
                } else {
                    $this->error('修改商品失败',U('upd',array('goods_id'=>$shuju['goods_id'])),2);
                }
            } else {
                $this->error('参数有问题,请联系管理员',U('showlist'),2);
            }
        } else {

        // 接收被修改商品的id
        $goods_id = I('get.goods_id');
        session('goods_upd_id',$goods_id);

        // 把当前被修改的商品id信息存储给session
        // 根据$goods_id获得被修改商品的基本信息
        $info = D('Goods')->find($goods_id);
        $this->assign('info',$info);

        // 根据$goods_id获得被修改商品类型信息
        $typeinfo = D('Type')->select();
        $this->assign('typeinfo',$typeinfo);

        // 根据$goods_id获得被修改商品的相册信息
        $pic_info = D('GoodsPics')->where("goods_id=$goods_id")->select();
        $this->assign('pic_info',$pic_info);
        $this->display();
        
        }
    }

    // 删除相册图片
    function delPics() {

        // 接收pics_id
        $pics_id = I('post.pics_id');
        
        // 根据$pics_id做条件进行相册查询
        $picsinfo = D('GoodsPics')->find($pics_id);
        // 删除物理相册图片
        if(file_exists($picsinfo['pics_big'])) {
            unlink($picsinfo['pics_big']);
        }
        if(file_exists($picsinfo['pics_mid'])) {
            unlink($picsinfo['pics_mid']);
        }
        if(file_exists($picsinfo['pics_sma'])) {
            unlink($picsinfo['pics_sma']);
        }

        // 删除数据记录
        if(D('GoodsPics')->delete($pics_id)) {
            echo json_encode(array('status'=>0));   // 成功
        } else {
            echo json_encode(array('status'=>1));   // 失败
        }
    }

    // 根据类型获得属性信息[添加商品]
    function getAttrByType() {
        // 获得客户端传递过来的type_id
        $type_id = I('get.type_id');

        // 根据$type_id获得对应的属性信息
        $attrinfo = D('Attribute')
            ->where(array('type_id'=>$type_id))
            ->select();
        echo json_encode($attrinfo);
    }

    // 根据类型获得属性信息[修改商品]
    function getAttrByType2() {

        // 获取客户端传递过来的goods_id和type_id
        $goods_id = I('get.goods_id');
        $type_id = I('get.type_id');

        // 获得属性列表信息(实体、空壳)
        // sp_attribute与sp_goods_attr做连表查询，通过attr_id关联
        $attrinfo = D('Attribute')
            ->alias('a')
            ->field('a.attr_id,a.attr_name,a.attr_sel,a.attr_vals,(select group_concat(ga.attr_value) from sp_goods_attr ga where ga.attr_id=a.attr_id and ga.goods_id='.$goods_id.') attr_values')
            ->where(array('a.type_id'=>$type_id))
            ->select();
            echo json_encode($attrinfo);
    }

    // 删除商品
    function del($goods_id) {

        $goods = D('Goods');
        if(!empty($_GET)) {
            $z = $goods->delete($goods_id);
            if($z) {
                $this->redirect('showlist',array(),1,'删除商品成功！');
            } else {
                $this->redirect('showlist',array(),1,'删除商品失败！');
            }
        }
    }
}