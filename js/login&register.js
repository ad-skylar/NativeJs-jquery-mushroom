/**
 * Created by Administrator on 2017/3/25 0025.
 */
$(function () {

    login();
    register();
});
function tab() {
    $(".login_mod_tab a").eq(0).click(function () {
        $("#form_show").css("display","block");
        $("#form_show2").css("display","none");
        $(this).addClass("tab_line").siblings().removeClass("tab_line");
    })
    $(".login_mod_tab a").eq(1).click(function () {
        $("#form_show").css("display","none");
        $("#form_show2").css("display","block");
        $(this).addClass("tab_line").siblings().removeClass("tab_line");
    })
}
function login() {
    $("#submit").click(function () {
        ajaxRequest("post", "../php/login.php", true, {
            "user": $(".user").val(),
            "pwd":  $(".pwd").val()
        }, function (data) {
            console.log(data);
            data=data.replace(/\s+/g,"");
            console.log(data);
            if(data!="0") {
                    document.cookie = "uName=" + $(".user").val() + ";path=/;expires=" + new Date(new Date().getTime() + 7 * 24 * 3600 * 1000) + ";";
                    document.cookie = "pwd=" + $(".pwd").val() + ";path=/;expires=" + new Date(new Date().getTime() + 7 * 24 * 3600 * 1000) + ";";
                    window.location.href="../index.html";
                tab();

            }else{
               $(".error_tip").css("display","block")
            }
        });
    })

}
function register() {
    var i=3;
    $("#reg").click(function() {
        if(/^\w{6,20}$/g.test( $("#user")[0].value)&&/\w{6,20}/g.test($("#pwd")[0].value)&&/^1[3 4 5 7 8]\d{9}$/g
                .test($("#phoneNum")[0].value)){
            if($("#pwd")[0].value==$("#sure")[0].value) {
                ajaxRequest("post", "../php/regist.php", true, {
                    "account": $("#user")[0].value,
                    "secret": $("#pwd")[0].value,
                    "mobile": $("#phoneNum")[0].value
                }, function (data) {
                    data = data.replace(/\s+/g, "");
                    if (data == "0") {
                        alert("注册失败！！");
                    } else{
                        open();
                    }
                });
            }else{
                $(".error_tip_mima").css("display","block");
               // alert("两次输入的密码不一致，请重新输入！！");
            }
        }else{
            $(".error_tip_reg").css("display","block")
        }

    });
    function open() {
        timer=setInterval(play,1000);
        function play() {
            if(i==0){
                window.location="login.html";
                window.clearInterval(timer);
            }
            $("body").html('<div id="open">还有<span>'+i+'</span>秒，为您跳转到登录页面...</div>');
            i--;
        }

    }
}