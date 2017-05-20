<?php
return array(
	//'配置项'=>'配置值'

	// 在页面底部显示跟踪信息
	'SHOW_PAGE_TRACE'=>false,
	

	// Back后台配置文件
	'AD_CSS_URL' => '/admin/Public/Admin/css/',
	'AD_JS_URL' => '/admin/Public/Admin/js/',
	'AD_IMG_URL' => '/admin/Public/Admin/images/',

	// 使用重写访问地址
	'URL_MODEL' => 2,

	// 为引入Plugin插件静态文件设置访问目录
	'PLUGIN_URL' => '/Application/Common/Plugin/',

	 /* 数据库设置 */
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  'localhost', // 服务器地址
    'DB_NAME'               =>  'mushroom',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  'root',          // 密码
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  'sp_',    // 数据库表前缀
);