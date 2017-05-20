function headSubNav(){
    $(".head-top li:eq(4)").hover(function () {
        $(".head-subNav:eq(0)").css({"display":"block"});
    },function () {
        $(".head-subNav:eq(0)").css({"display":"none"});
    })
    $(".head-top li:eq(5)").hover(function () {
        $(".head-subNav:eq(1)").css({"display":"block"});
    },function () {
        $(".head-subNav:eq(1)").css({"display":"none"});
    });
    $(".head-subNav a").hover(function () {
        $(this).css({"background":"#999"});
    },function () {
        $(this).css({"background": "#eee"});
    });
    changeUser();
    href();
}
function changeUser() {
    function cookie() {
        var _cookies=document.cookie;
       // console.log(_cookies)
        if(_cookies.indexOf("uName")>=0){
            var _arr=_cookies.split("; ");
           // console.log(_arr);
            var uNames="";
            var uNames=_arr[0].match(/\w+/g)[1]
            //console.log(uNames);
           // $("#reg").html('欢迎您'+uNames+'');
            $("#log").css("display","none");
            document.getElementById("reg").outerHTML='<span class="showName">欢迎您'+uNames+'</span>';
        }
    }
    cookie();
}
function href() {
    $("#reg").click(function () {
        window.location.href="register.html";
    })
    $("#log").click(function () {
        window.location.href="login.html";
    })
    $(".home").click(function () {
        window.location.href="../index.html";
    })
    $(".car").click(function () {
        window.location.href="shoppingCar.html"
    })
}
