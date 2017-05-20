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
        console.log(_cookies)
        if(_cookies.indexOf("uName")>=0){
            var flag=1;
            var _arr=_cookies.split("; ");
            console.log(_arr);
            var uNames="";
            var uNames=_arr[0].match(/\w+/g)[1];
            console.log(uNames);
            $("#log")[0].outerHTML='<a id="exit">退出</a>';
            $("#exit").click(function () {
                document.cookie="uName"+"=;path="+"/"+";"+"expires="+new Date("1970-01-01")+";";
                location.reload();
                $("#exit")[0].outerHTML='<a href="html/login.html" id="login" >登陆</a>';
            })
            document.getElementById("reg").outerHTML='<span class="showName">欢迎您'+uNames+'</span>';
            $("#change").html(uNames);
            $("#exit").css("display:block");
            $("#photo").css({
                'background': "url('images/photo.jpg')",
                "background-size": "100%"
            })
            $("#center").html("会员中心");
            $(".wrapper").css("display","block");

        }

    }
    cookie();
}
function href() {
    $("#reg").click(function () {
        window.location.href="html/register.html";
       })
    $("#log").click(function () {
        window.location.href="html/login.html";
    })
    $(".home").click(function () {
        window.location.href="index.html";
    })
    $(".car").click(function () {
        window.location.href="html/shoppingCar.html"
    })
}
