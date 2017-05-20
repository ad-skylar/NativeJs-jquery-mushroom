/**
 * Created by Administrator on 2017/3/29 0029.
 */
$(function () {
    $(".header").load("head.html", headSubNav);
    $(".sidebar").load("sidebar.html", sidebar);
    count();
    createElment();

})
function createElment() {
    var str = location.search;
    console.log(typeof (str));
    var arr = str.split("=");
    var attr = arr[1];
    var  _code="",_code2="",_code3="",_codeSmall="",_codeBig="";
    $.post("../data/list_test.json", null, function (data, textStatus) {
        if (textStatus == "success") {
            for(var i=0;i<3;i++){
                _code+='<li><img src="../images/'+data[attr]["style"][i]["url"]+'"></li>'
            }
            for(var i=0;i<+data[attr]["small_img"].length;i++){
                _codeSmall+='<li><img src="../images/'+data[attr]["small_img"][i]+'"></li>'
            }
            for(var i=0;i<+data[attr]["main"].length;i++){
                _codeBig+='<li><img src="../images/'+data[attr]["main"][i]+'"></li>'
            }
            $(".big-img").append(_codeBig)
            $(".small_wrap").append(_codeSmall);
            $(".style-color").append(_code);
            $(".goods-title").html('<span>'+data[attr]["g_detail"]+'</span>');
            $(".style-color li").click(function () {
                var _index=$(this).index();
                $(".big-img li:eq("+_index+")").css({"display":"block"}).siblings().css({"display":"none"})
                $(".price").html('¥'+data[attr]["style"][_index]["price"]+'')
                $(".origin-count").html('¥'+data[attr]["style"][_index]["origin"]+'')
            })
            chooseStyle();
        }
            $(".buy-cart").click(function () {
                var _cookies=document.cookie;
                console.log(_cookies)
                if(_cookies.indexOf("uName")>=0){
                    var json = {
                    }
                    var obj=""
                    if($.cookie("cart")){
                        obj = JSON.parse($.cookie("cart"))
                    }else{
                        obj = {}
                    }
                    obj[attr] = ++obj[attr] || 1
                    console.log(obj)
                    var objToStr = JSON.stringify(obj);
                    console.log(objToStr);
                    $.cookie("cart",objToStr,{expires:20,path:"/"})
                    //Cookie.setCookie("cart",objToStr,"/",new Date(new Date().getTime()+20*24*3600*1000));
                  //  window.location.href="../html/ShoppingCar.html";
                    alert("添加成功")
                }else {
                    alert("请登陆")
                }

            })
    });
}
function count() {
    $(".num-reduce").click(function () {
        if($(".num-input")[0].value<=1||$(".num-input")[0].value>=40){
            $(".num-input")[0].value=1;
        }else{
            $(".num-input")[0].value--;
        }
    })
    $(".num-add").click(function () {
        if($(".num-input")[0].value>=40){
            $(".num-input")[0].value=40;
        }else{
            $(".num-input")[0].value++;
        }
    })

}
function chooseStyle() {
    $(".style-list li").click(function () {
        var _index1=$(this).index()
        $(this).addClass("choose").siblings().removeClass("choose");
    })
    $(".small_wrap li").click(function () {
        var _index=$(this).index();
        $(".big-img li:eq("+_index+")").css({"display":"block"}).siblings().css("display","none");
        $(this).addClass("opa").siblings().removeClass("opa")
    })


}




