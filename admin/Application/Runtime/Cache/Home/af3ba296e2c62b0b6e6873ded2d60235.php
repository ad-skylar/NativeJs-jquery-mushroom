<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>爱购后台管理平台</title>
<link rel="stylesheet" type="text/css" href="<?php echo C('AD_CSS_URL');?>style.css"/>
<script type="text/javascript" src="<?php echo C('AD_JS_URL');?>js.js"></script>
</head>
<body>
<div id="top"></div>
<form id="login" name="login" action="" method="post">
  <div id="center">
    <div id="center_left"></div>
    <div id="center_middle">
      <div class="user">
        <label>用户名：
        <input type="text" name="manager_name" id="user" />
        </label>
      </div>
      <div class="user">
        <label>密　码：
        <input type="password" name="manager_pwd" id="pwd" />
        </label>
      </div>
      <div class="chknumber">
        <label>验证码：
        <input name="manager_verify" type="text" id="chknumber" maxlength="4" class="chknumber_input" style="vertical-align: middle;" />
        </label>
        <img src="/admin/Home/Manager/verifyImg" id="safecode" width="57" height="20" style="vertical-align: middle;" onclick="this.src='/admin/Home/Manager/verifyImg/'+Math.random()" /><span>看不清？<a href=""><span style="color: rgb(173,201,201);">换一张</span></a></span>
      </div>
    </div>
    <div id="center_middle_right"></div>
    <div id="center_submit">
      <div class="button"> <img src="<?php echo C('AD_IMG_URL');?>dl.gif" width="57" height="20" onclick="form_submit()" > </div>
      <div class="button"> <img src="<?php echo C('AD_IMG_URL');?>cz.gif" width="57" height="20" onclick="form_reset()"> </div>
    </div>
    <div id="center_right" style="color: red;"><?php echo ((isset($errorinfo) && ($errorinfo !== ""))?($errorinfo):""); ?></div>
  </div>
</form>
<div id="footer"></div>
</body>
</html>