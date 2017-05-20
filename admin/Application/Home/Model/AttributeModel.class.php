<?php
namespace Admin\Model;
use Think\Model;

class AttributeModel extends Model {
	
	// 添加属性时，给表单域设置验证效果
	// 是否批处理验证
	protected $patchValidate = true;// 对多个项目同时验证
	protected $_validate = array(
		// 属性名称验证
		array('attr_name','require','属性名称必须设置'),
		// 商品类型验证
		array('type_id','0','商品类型必须选取',0,'notequal'),
	);
}