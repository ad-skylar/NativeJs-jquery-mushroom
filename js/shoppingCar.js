$(function () {
    $(".header").load("head.html", headSubNav);
    $(".sidebar").load("sidebar.html", sidebar);
    createElement();
    store();
})
//创建dom
function createElement() {
    var strToObj = JSON.parse($.cookie('cart'));
    var i=0;
   $.post("../data/list_test.json", null, function (data, textStatus) {
        if (textStatus == "success") {
            var  goodDetail="";
            for(var k in strToObj){
                i++;
                var _data = data[k];
                //console.log(_data);
                _data["num"] = strToObj[k]
                goodDetail+='<tr class="cart_mitem" id="'+_data["id"]+'">' +
                   '<td class="vm"><input type="checkbox" class="cart_thcheck"></td>' +
                    '<td class="cart_table_goods_wrap"><a href="###" class="cart_goods_img"><img src="../images/'+_data["g_url"]+'"/></a>' +
                    '<a href="###" class="cart_goods_t">'+_data["g_detail"]+'</a></td>' +
                    '<td><p class="cart_lh20">颜色:'+_data["style"][i]["name"]+'</p>' +
                    '<p>尺码：'+_data["style"][i]["size"][0]+'</p></td><td class="cart_alcenter">' +
                    '<p class="line">'+_data["style"][i]["origin"]+'</p>' +
                    '<p class="price">'+_data["style"][i]["price"]+'</p></td>' +
                    '<td class="cart_alcenter"><div class="cart_num"><input type="text" value="'+_data["num"]+'" class="cart_num_input cart_bold">' +
                   '<span class="cart_num_add"></span><span class="cart_num_reduce"></span></div></td><td class="cart_alcenter"><p class="xj"></p></td><td class="cart_alcenter"><a href="###" class="deleteP a'+i+'">删除</a></td></tr>';
                if(i==2){
                    i=0;
                }
            }
            $(".cart_table tbody").html(goodDetail);
            $("input[type='checkbox']").prop("checked", true);

            _delect();
            checkChoose();
            xj();
            countHandel();
            sum();
            filter();
        }
    });
}
//购买数量计算
function countHandel() {
    var cart = JSON.parse($.cookie('cart'));
    $(".cart_num_add").click(function () {
        var id = $(this).parents(".cart_mitem").attr("id");
        var val= $(this).parents(".cart_num").find(".cart_num_input").val()
        $(this).parents(".cart_num").find(".cart_num_input")[0].value = ++val;
        xj();
        cart[id]= $(this).parents(".cart_num").find(".cart_num_input")[0].value
        var cart1 = JSON.stringify(cart);
        $.cookie("cart",cart1,{expires:20,path:"/"});
        sum();
    })
    $(".cart_num_reduce").click(function () {
        var id = $(this).parents(".cart_mitem").attr("id");
        var val= $(this).parents(".cart_num").find(".cart_num_input").val()
        $(this).parents(".cart_num").find(".cart_num_input")[0].value = --val;
        cart[id]= $(this).parents(".cart_num").find(".cart_num_input")[0].value
        var cart1 = JSON.stringify(cart);
        $.cookie("cart",cart1,{expires:20,path:"/"})
        xj();
        sum();

    });
}
//小计
function xj() {
    var cart = JSON.parse($.cookie('cart'));
    var dj=0,count=0,_xj=0;
    var arr=[];
    for(var k in cart){
        dj=$("#"+k+"").find(".price").html();
        count=$("#"+k+"").find(".cart_num_input").val();
        _xj=$("#"+k+"").find(".xj").html(count*dj);
    }
}
//选择删除
function _delect(){
    var cart = JSON.parse($.cookie('cart'));
    $(".deleteP").click(function () {
        if(window.confirm("是否删除？")){
            var id = $(this).parents(".cart_mitem").attr("id");
            delete cart[id];
            var cart1 = JSON.stringify(cart)
            $.cookie("cart",cart1,{expires:20,path:"/"})
            createElement();
        }
    })
    // 点击全部删除
    $("#cartRemoveChecked")[0].onclick = function () {
        if ($("#allNum").html() != 0) {
            var con = confirm('确定删除所选商品吗？');
            if (con) {
                for (var i = 0; i < $(".cart_thcheck").length; i++) {
                    if ($(".cart_thcheck").eq(i).is(':checked')) {
                        var id = $(".cart_thcheck").eq(i).parents(".cart_mitem").attr("id");
                        delete cart[id];
                        var cart1 = JSON.stringify(cart)
                        console.log(cart1);
                        $.cookie("cart",cart1,{expires:20,path:"/"});
                        createElement();
                        //$(".cart_mitem").remove();
                    }
                }
            }
        } else {
            alert('请选择商品！');
        }
        sum(); //更新总数
    }
}
function checkChoose() {
    $(".s_all ").click(function () {
        for(var i=0;i<$(".cart_thcheck").length;i++){
            if(this.checked){
                $(".cart_thcheck")[i].checked=true;
                $("#topAll")[0].checked=true;
                $("#bottomAll")[0].checked = true;
                console.log($(this));
            }else{
                $(".cart_thcheck")[i].checked=false;
                $("#topAll")[0].checked=false;
                $("#bottomAll")[0].checked = false;
            }
        }
        sum();
    })
    for(var i=0;i<$(".cart_thcheck").length;i++){
        $(".cart_thcheck").click(function () {
            if(this.checked){
                var flag = 0;
                for(var j=0;j<$(".cart_thcheck").length;j++){
                    if(!$(".cart_thcheck")[j].checked){
                        flag= 1;
                    }
                }
            }if(flag ==0){
                $(".s_all")[0].checked = true;
                $("#bottomAll")[0].checked = true;
            }else{
                $(".s_all")[0].checked = false;
                $("#bottomAll")[0].checked = false;
            }
            sum();
        })
    }
}

//安全过滤验证
function filter() {
    var _txt=document.getElementsByTagName("input");
    for(var j=0;j<_txt.length;j++){
        if(_txt[j].type=="text"){
            var _val=0;
            _txt[j].onfocus=function(){
                _val=this.value;
            }
            _txt[j].onchange=function(){
                if(/^\d+$/.test(this.value)){
                    if(parseInt(this.value)>0){
                        var id = $(".cart_thcheck").eq(i).parents(".cart_mitem").attr("id");
                        delete cart[id];
                        var cart1 = JSON.stringify(cart)
                        console.log(cart1);
                        $.cookie("cart",cart1,{expires:20,path:"/"});
                    }else{
                        this.value=_val;
                    }
                }else{
                    this.value=_val;
                }
            }
        }
    }
}
function sum() {
    var count=0;
    var sum=0,total=0;
    for(var j=0;j<$(".cart_thcheck").length;j++){
        if($(".cart_thcheck").eq(j).is(':checked')){
                count += Number($(".cart_num_input").eq(j).val());
               total+=Number($(".xj").eq(j).text());
        }
    }
    $("#allNum").html(count);
$("#allPrice").html('¥ '+total+'.00')


}
function store() {
    var strToObj = JSON.parse($.cookie('cart'));
    console.log(strToObj);
}
