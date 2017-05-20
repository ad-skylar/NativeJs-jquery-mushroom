/**
 * Created by Administrator on 2017/3/20 0020.
 */

function search() {
    function getData(data){
        var _data=data;
        var _code="";
        for(var i=0;i<_data["result"].length;i++){
            _code+='<li><a href="html/list.html">'+_data["result"][i][0]+'</a></li><br/>'
        }
        $(".searContent").html('<ul>'+_code+"</ul>");
    }
    $(".ts_txt").focus(function () {
        $(".searContent").css("display","block");
    });
    $(".ts_txt").on("input",function(){
        //http://list.mogujie.com/module/mget?code=tips&token=LFhUZjzBQ4ZzMeZDCsYwfKi66vVBjFGxY8Z%2BPnNpvj2D7osdBR04tNXyfaRS%2BXpS&keyWord=%E4%B8%8A%E8%A1%A3&callback=__GET_SEARCH_RESULT_1__&_=1491536359905
        var _url="https://suggest.taobao.com/sug?code=utf-8&q="+$(this).val()+"&callback=?";
        $.getJSON(_url,getData);
    });
    $(".ts_txt").blur(function () {
        setTimeout(function () {
            $(".searContent").css("display","none");
        },300)
    })
    function searchFix() {
        $(window).scroll(function () {
            if($(document).scrollTop()>700){
                $(".search").addClass("search_fix");
                $(".search_nav").css({"display":"block"});
                $(".search_r,.search_logo,.hotwords").css({"display":"none"})

            }else {
                $(".search").removeClass("search_fix");
                $(".search_r,.search_logo").css({"display":"block"})
                $(".page_nav").css({"display":"block"});
                $(".search_nav").css({"display":"none"})
            }
            navClick()
        })

    }
    searchFix();
    function navClick() {
        var flag=1;
        $(".search_nav").click(function () {
            if(flag){
                $(".page_nav").css({
                    "position":"fixed",
                    "top":"65px",
                    "z-index":"999",
                    "display":"block"
                })
                $(".nav_list").css({
                    "background-color": "rgba(0, 0, 0, 0.5)",
                    "color":"#fff"
                })
                $(".nav_list a").css({
                    "color":"#999"
                })
                flag=!flag;
            }else{
                $(".page_nav").css({
                    "position":"relative",
                    "z-index":"999",
                    "top":"0"
                })
                $(".nav_list").css({
                    "background": "rgba(255,255,255,.3)",
                })
                $(".nav_list a").css({
                    "color":"#666"
                })
                flag=!flag;
            }
        })
    }
    function hotWord() {
        $.post("data/multiple.json", null, function (data, textStatus) {
            var _data = data;
            var _code = "";
            if (textStatus == "success") {
                for (var i = 0; i < _data["sub_nav"].length; i++) {
                    _code += '<li><a href="##"> ' + _data["sub_nav"][i] + '</a></li>';
                }
                $(".sun_nav").html(_code);
            }
        });
    }
    hotWord();
}


