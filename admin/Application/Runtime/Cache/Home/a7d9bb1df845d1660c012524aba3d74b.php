<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body { 
  margin-left: 3px;
  margin-top: 0px;
  margin-right: 3px;
  margin-bottom: 0px;
}
.STYLE1 {
  color: #e1e2e3;
  font-size: 12px;
}
.STYLE6 {color: #000000; font-size: 12; }
.STYLE10 {color: #000000; font-size: 12px; }
.STYLE19 {
  color: #344b50;
  font-size: 12px;
}
.STYLE21 {
  font-size: 12px;
  color: #3b6375;
}
.STYLE22 {
  font-size: 12px;
  color: #295568;
}
a:link{
    color:#e1e2e3; text-decoration:none;
}
a:visited{
    color:#e1e2e3; text-decoration:none;
}
-->
</style>

<!--引入富文本编辑器的3个js文件-->
<script type="text/javascript" src="<?php echo C('PLUGIN_URL');?>ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="<?php echo C('PLUGIN_URL');?>ueditor/ueditor.all.min.js"> </script>
<script type="text/javascript" src="<?php echo C('PLUGIN_URL');?>ueditor/lang/zh-cn/zh-cn.js"></script>

<!--引入jquery-->
<script type="text/javascript" src="<?php echo C('AD_JS_URL');?>jquery-1.8.2.min.js"></script>

</head>

<body>
  <style type="text/css">
    #tabbar-div {
        background: #80bdcb none repeat scroll 0 0;
        height: 22px;
        padding-left: 10px;
        padding-top: 1px;
        margin-bottom: 3px;
    }
    #tabbar-div p { margin: 2px 0 0;font-size:12px;
    }
    .tab-front {
        background: #bbdde5 none repeat scroll 0 0;
        border-right: 2px solid #278296;
        cursor: pointer;
        font-weight: bold;
        line-height: 20px;
        padding: 4px 15px 4px 18px;
    }
    .tab-back {
        border-right: 1px solid #fff;
        color: #fff; cursor: pointer;line-height: 20px;
        padding: 4px 15px 4px 18px;
    }
  </style>
<script type="text/javascript">
//页面加载完毕就给span切换标签设置点击事件
$(function(){
  $('#tabbar-div span').click(function(){
    //① 当前标签点击高亮设置
    //$(this):代表当前被点击的span对象
    //当前被点击的标签高亮显示，其他同级兄弟标签变暗显示
    //siblings()获得当前节点的其他同级兄弟节点
    $(this).attr('class','tab-front').siblings().attr('class','tab-back');

    //② 标签对应的内容要显示
    //全部的table都隐藏 (特点：id的属性值是-tab-show结尾)
    $('[id$=-tab-show]').hide();
    var idflag = $(this).attr('id');//获得标签的id属性值
    //标签对应内容table显示
    $('#'+idflag+'-show').show();    

  });
});
</script>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="30"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="24" bgcolor="#353c44"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="6%" height="19" valign="bottom"><div align="center"><img src="<?php echo C('AD_IMG_URL');?>tb.gif" width="14" height="14" /></div></td>
                <td width="94%" valign="bottom"><span class="STYLE1"> 商品管理 -> 修改商品</span></td>
              </tr>
            </table></td>
            <td><div align="right"><span class="STYLE1"> 
            <a href="<?php echo U('showlist');?>">返回</a>   &nbsp; </span>
              <span class="STYLE1"> &nbsp;</span></div></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan="100">
    <div id="tabbar-div">
      <p>
        <span class="tab-front" id="general-tab">通用信息</span>
        <span class="tab-back" id="detail-tab">详细描述</span>
        <span class="tab-back" id="mix-tab">其他信息</span>
        <span class="tab-back" id="properties-tab">商品属性</span>
        <span class="tab-back" id="gallery-tab">商品相册</span>
        <span class="tab-back" id="linkgoods-tab">关联商品</span>
        <span class="tab-back" id="groupgoods-tab">配件</span>
        <span class="tab-back" id="article-tab">关联文章</span>
      </p>
    </div>
    </td>
  </tr>
  <tr>
    <td>
      <form action="" method="post" enctype="multipart/form-data">
        <input type="hidden" name="goods_id" value="<?php echo ($info["goods_id"]); ?>" />
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="general-tab-show">
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">商品名称：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
        <input type="text" name="goods_name" size="100" value="<?php echo ($info["goods_name"]); ?>"/></div></td>
      </tr><tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">价格：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left"><input type="text" name="goods_price"  value="<?php echo ($info["goods_price"]); ?>"/></div></td>
      </tr><tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">数量：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left"><input type="text" name="goods_number"  value="<?php echo ($info["goods_number"]); ?>"/></div></td>
      </tr><tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">原价：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left"><input type="text" name="goods_weight"  value="<?php echo ($info["goods_weight"]); ?>"/></div></td>
      </tr><tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">商品logo图片：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
          <input type="file" name="goods_logo" />
          <img src="<?php echo (substr($info["goods_small_logo"],1)); ?>" alt="没有logo图片" />
        </div></td>
      </tr>
    </table>
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="detail-tab-show" style="display:none;">
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">详情描述：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
        <textarea style="width:620px; height:200px;" id="goods_introduce" name="goods_introduce"><?php echo ($info["goods_introduce"]); ?></textarea>
        </div></td>
      </tr>
    </table>
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="mix-tab-show" style="display:none;">
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">其他信息</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
        </div></td>
      </tr>
    </table>    
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="properties-tab-show" style="display:none;">
      <tr>
        <td height="20" bgcolor="#FFFFFF" width="40%" class="STYLE6"><div align="right"><span class="STYLE19" style="font-weight:bold;">商品类型：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19">
          <div align="left">
            <select name="type_id" id="type_id" onchange="get_attr_info2()">
              <option value="0">-请选择-</option>
              <?php if(is_array($typeinfo)): foreach($typeinfo as $key=>$v): ?><option value="<?php echo ($v["type_id"]); ?>"
                  <?php if(($info["type_id"]) == $v["type_id"]): ?>selected='selected'<?php endif; ?>
                ><?php echo ($v["type_name"]); ?></option><?php endforeach; endif; ?>
            </select><br />
            请选择商品的所属类型，进而完善此商品的属性
          </div>
        </td>
      </tr>
    </table>
<script type="text/javascript">
//页面加载完毕，就主动调用get_attr_info2()使得类型和属性表单域对应都显示
$(function(){
  get_attr_info2();
});

//类型切换获取对应的属性信息(实体或空壳)
function get_attr_info2(){
  var goods_id = $('[name=goods_id]').val();//商品goods_id
  var type_id = $('#type_id').val();//类型type_id

  //Ajax去服务器端获得属性信息
  $.ajax({
    url:'/index.php/Admin/Goods/getAttrByType2',
    data:{'goods_id':goods_id,'type_id':type_id},
    dataType:'json',
    type:'get',
    success:function(msg){
      //console.log(msg);
      //遍历msg使得与html标签(tr/td)结合追加给页面
      var s = "";
      $.each(msg,function(n,v){
        //判断当前属性时唯一的、还是单选的
        if(v.attr_sel == 'only'){
          //唯一属性、input输入框
          s += '<tr> <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">'+v.attr_name+'：</span></div></td> <td height="20" bgcolor="#FFFFFF" class="STYLE19"> <div align="left">';

          //判断实体、空壳属性
          if(v.attr_values==null){
            //空壳
            s += '<input type="text" name="attr_info['+v.attr_id+'][]" />';
          }else{
            //实体
            s += '<input type="text" name="attr_info['+v.attr_id+'][]" value="'+v.attr_values+'" />';
          }
          s += '</div></td> </tr>';
        }else{
          //单选属性、select下拉列表
          //判断实体、空壳属性
          if(v.attr_values==null){
            //空壳
            s += '<tr> <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><e class="STYLE19" onclick="add_attr2(this)">[+]</e><span class="STYLE19">'+v.attr_name+'：</span></div></td> <td height="20" bgcolor="#FFFFFF" class="STYLE19"> <div align="left"> <select name="attr_info['+v.attr_id+'][]"><option value="0">-请选择-</option>';
            //拆分可选值列表信息
            var attr_values = v.attr_vals.split(','); //String---->Array
            for(var i=0; i<attr_values.length; i++){
              s += '<option value="'+attr_values[i]+'">'+attr_values[i]+'</option>';
            }
            s += '</select> </div></td> </tr>';
          }else{
            //实体
            //获取当前设置的属性值，并把其变为数组
            var now_values = v.attr_values.split(',');//String--->Array ['翻盖','滑盖','折叠']

            for(var k=0; k<now_values.length;k++){
              s += '<tr> <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right">';
              if(k==0){
                s += '<e class="STYLE19" onclick="add_attr2(this)">[+]</e>';
              }else{
                s += '<e class="STYLE19" onclick="$(this).parent().parent().parent().remove()">[-]</e>';
              }

              s += '<span class="STYLE19">'+v.attr_name+'：</span></div></td> <td height="20" bgcolor="#FFFFFF" class="STYLE19"> <div align="left">'; 

              s += '<select name="attr_info['+v.attr_id+'][]"><option value="0">-请选择-</option>';
              //拆分可选值列表信息
              var xuan_values = v.attr_vals.split(','); //String---->Array
              for(var i=0; i<xuan_values.length; i++){
                //设置属性值项目选中
                s += '<option value="'+xuan_values[i]+'"';
                if(now_values[k] == xuan_values[i]){
                  s += ' selected="selected" ';
                }
                s += '>'+xuan_values[i]+'</option>';
              }
              s += '</select> </div></td> </tr>';
            }
          }
        }
      });

      //删除之前旧的tr元素
      $('#properties-tab-show tr:gt(0)').remove();
      //把s追加给页面
      $('#properties-tab-show').append(s);
    }
  });
}

//点击[+]可以增加单选属性表单域
function add_attr2(obj){
  //根据obj复制一个tr出来
  //dom对象变为jquery对象：$(dom对象)
  var futr = $(obj).parent().parent().parent().clone();

  //删除futr内部的e标签
  futr.find('e').remove();
  console.log(futr);
  //制作一个"[-]号"的e标签
  var jiane = "<e class='STYLE19' onclick='$(this).parent().parent().parent().remove()'>[-]</e>";

  //追加jiane给futr，具体追加给span前边作为兄弟节点
  futr.find('span').before(jiane);

  //追加futr到当前被点击tr的后边
  $(obj).parent().parent().parent().after(futr);
}


//[+]号可以增加相册图片
function add_pics_item(obj){
  //obj:对应[+]父级span的"dom对象"
  //$(obj):把dom对象转化为jquery对象

  //获得[+]对应的tr
  var addtr = $(obj).parent().parent().parent();
  var futr = addtr.clone();//复制一个tr出来

  //制作一个[-]号的span
  var sp = "<span class='STYLE19' onclick='$(this).parent().parent().parent().remove()'>[-] 商品相册：</span>";
  //删除futr内部的[+]对应的span
  futr.find('span').remove();
  //把[-]的span追加给futr
  futr.find("div[align=right]").append(sp);

  //把futr追加给table完活
  $('#gallery-tab-show').append(futr);
}

//实现当个相册图片的Ajax方式删除
function del_pics(pics_id){
  $.ajax({
    url:"<?php echo U('delPics');?>",
    //  /index.php/Admin/Goods/delPics
    data:{'pics_id':pics_id},
    dataType:'json',
    type:'post',
    success:function(msg){
      if(msg.status===0){
        //dom方式删除页面上具体的相册
        $('#pics_show_'+pics_id).remove();
      }
    }
  });
}
</script>
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="gallery-tab-show" style="display:none;">
      <tr>
        <td colspan='100'>
          <ul>
            <?php if(is_array($picsinfo)): foreach($picsinfo as $key=>$v): ?><li style="list-style:none;float:left;" id="pics_show_<?php echo ($v["pics_id"]); ?>">
                <img src="<?php echo (substr($v["pics_mid"],1)); ?>" alt="" width="135" /><span style='color:red;cursor:pointer;' onclick="if(confirm('确认要删除该相册么？')){del_pics(<?php echo ($v["pics_id"]); ?>)}">[-]</span>
              </li><?php endforeach; endif; ?>
          </ul>
        </td>
      </tr>
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19" onclick="add_pics_item(this)">[+] 商品相册：</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
          <input type="file" name="goods_pics[]" />
        </div></td>
      </tr>      

    </table>    
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="linkgoods-tab-show" style="display:none;">
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">关联商品</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
        </div></td>
      </tr>
    </table>    
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="groupgoods-tab-show" style="display:none;">
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">配件</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
        </div></td>
      </tr>
    </table>    
    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce" id="article-tab-show" style="display:none;">
      <tr>
        <td height="20" bgcolor="#FFFFFF" class="STYLE6"><div align="right"><span class="STYLE19">关联文章</span></div></td>
        <td height="20" bgcolor="#FFFFFF" class="STYLE19"><div align="left">
        </div></td>
      </tr>
    </table>

    <table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#a8c7ce">
      <tr>
        <td colspan='100'  bgcolor="#FFFFFF"  class="STYLE6" style="text-align:center;">
        <input type="submit" value="修改" />
        </td>
      </tr>
    </table>

    </form>
    </td>
  </tr>
</table>
</body>
</html>
<script type="text/javascript">
var ue = UE.getEditor('goods_introduce',{toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal'
        ]]});
</script>