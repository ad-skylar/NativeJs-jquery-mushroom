/**
 * Created by Administrator on 2017/3/28 0028.
 */
$(function () {
    $(".header").load("head.html", headSubNav);
    $(".search").load("search.html", search);
    $(".sidebar").load("sidebar.html", sidebar);
    //loadNav();
    getData()
    page();
    $(".defined").click(function () {
        filter($(".from").val(),$(".to").val());
    })
    $(".six").click(function () {
        filter(60,76);
    })
    $(".seven").click(function () {
        filter(76,98);
    })
    $(".nine").click(function () {
        filter(98,299);
    })
})
/**
 * 获取数据
 */
function getData() {
    $.post("../data/list.json", function (data, textStatus) {
        if (textStatus == "success") {
            var jsonArr = new Array();
            for (var k in data) {
                var lis = "";
                var content = "";
                jsonArr.push(data[k]);

                /**
                 * 创建nav_list内容 并添加到nav_list
                 */
                createNavList(lis, data[k]);
                $(".nav_list li").eq(0).addClass("on");

                /**
                 * 创建goodsList内容 并添加到sp_content
                 */
                createSpTypeNav(content, data[k]);
                $(".goodsList").eq(0).css({display: "block"})
            }

            /**
             * 创建type_section 放入type_sections
             */
            for (var i = 0; i < $(".goodsList").length; i++) {
                var section = "";
                createSection(section, jsonArr, i);
            }

            /**
             * 创建ul下面的li
             */
            for (var i = 0; i < $(".nav_list li").length; i++) {
                createLis(i, 1, jsonArr);
                createLis(i, 2, jsonArr);
                createLis(i, 3, jsonArr);
                createLis(i, 4, jsonArr);
            }

            /**
             * 点击事件切换下面的内容
             */
            clickTab();
        }
    })
}

/**
 * 创建nav_list内容 并添加到nav_list
 */
function createNavList(li, json) {
    li += '<li><a href="###">' + json["name"] + '</a></li>'
    $(".nav_list").append(li);
}

/**
 * 创建goodsList内容 并添加到sp_content
 */
function createSpTypeNav(con, json) {
    con = '<div class="goodsList"><a href="###" class="right_img"><img src="../images/list/' + json["images"] + '"/></a><div class="type_sections"></div></div>';
    $(".sp_content").append(con)
}

/**
 * 创建type_section 放入type_sections
 */
function createSection(con, jsonArr, i) {
    con += '<div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["1"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="../images/list/' + jsonArr[i]["list"]["1"]["img"] + '"/></a><ul></ul></dd></div><div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["2"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="../images/list/' + jsonArr[i]["list"]["2"]["img"] + '"/></a><ul></ul></dd></div><div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["3"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="../images/list/' + jsonArr[i]["list"]["3"]["img"] + '"/></a><ul></ul></dd></div><div class="type_section first"><dt><a href="###">' + jsonArr[i]["list"]["4"]["title"] + '</a></dt><dd><a class="cat_img" href="###"><img src="../images/list/' + jsonArr[i]["list"]["4"]["img"] + '"/></a><ul></ul></dd></div>'
    $(".type_sections").eq(i).append(con)
}

/**
 * 点击事件切换下面的内容
 */
function clickTab() {
    var txt = "";
    $(".nav_list li").on("click", function () {
        var index = $(this).index()
        $(".nav_list li").eq(index).addClass("on").siblings().removeClass("on");
        $(".sp_content .goodsList").eq(index).show().siblings().hide();

        /**
         * 改变h3文本
         */
        txt = $(".nav_list a").eq(index).html();
        $("#category_all").html(txt);
    })
}

/**
 * 创建ul下面的li
 */
function createLis(a, b, arr) {
    var con = "";
    for (var i = 0; i < arr[a]["list"][b]["list"].length; i++) {
        con += '<li><a href="###">' + arr[a]["list"][b]["list"][i] + '</a></li>'
    }
    $(".type_sections:eq(" + a + ") .type_section ul:eq(" + (b - 1) + ")").append(con)
}








function loadNav() {
    var _code="",_code1="";
    for(var i=0;i<15;i++){
        _code+='<li><a href="##">上衣</a></li>'
    }
    $(".nav_list").html(_code);
    for(var i=0;i<11;i++){
        _code+='<li><a href="##">美裙套装</a></li>'

    }
    $(".type_section").html('<h3>当季热卖</h3><ul><span><img src="../images/list1.jpg"></span>'+_code+'</ul>')
}
function PrefixInteger(num, length) {
    return ( "0000000000000000" + num +"").substr( -length );
}
function page() {
    var _star=0,_finish=20;
    var _total = 17, _count = 6,_size=20, _pages;
    var _click=0;
    function eventHandel() {
        $("body").on("click", ".page span", function () {
            $(this).addClass("pageClick").siblings().removeClass("pageClick");
            _click = $(this).html();
            var _index=$(this).index()
            creatContent(parseInt((_click - 1) * 20), parseInt(_click * 20));
            changeButton();
            changeValue();
        });
    }
    function changeButton() {
        if (_click == $(".page span:eq(5)").html() && _click< _pages-1) {
            $(".page span").each(function (i) {
                $(this).not($(".page span").eq(6)).not($(".page span").eq(0)).html((parseInt(_click) - 3 + i));
            });
        }
        if(_click == $(".page span:eq(1)").html()){
            if(_click-3>0){
                var _length=_click;
                $(".page span").each(function(i){
                    $(this).not($(".page span").eq(6)).not($(".page span").eq(0)).html(_length - 3 + i);
                });
            }
        }
    }
    function creatContent(_star,_finish){
        $.post("../data/list_dress.json", null, function (data, textStatus) {
            var _data = data,z=0;
            var  _loadImg="";
            for(var k in data){
                z++;
            }
            _pages=Math.ceil(z/_size);
            for(var i=_star;i<_finish;i++){
                _loadImg += '<div class="wall_goods_box fl"><a href="##" class="wall_goods_hover">找相似</a><a target="_blank"  href="detail.html?id=' +_data[i+1]["id"] + '" class="imageboxLink">' +
                    '<img src="../images/'+ _data[i+1]["g_url"] +'"><div class="goods_info fl">' +
                    '<p class="like_title fl">' + _data[i+1]["g_detail"] + '</p>' +
                    '<b class="price_info  fl">¥'+ _data[i+1]["g_price"] + '</b><p class="org_price fl">¥<span>'+ _data[i+1]["g_discount"] + '</span></p>' +
                    '<span class="fav_num fr">35961<img src="../images/start.png"></span></div></a></div>';
            }
            $(".wrap_hidden").html(_loadImg);
            boxHover();

        })
    }
    creatContent(_star,_finish);
    function boxHover() {
        $(".wall_goods_box").hover(function () {
            var index = $(this).index();
            $(this).css({"border":"1px solid #f07"})
            $(".wall_goods_hover:eq("+index+")").css("display","block");

        },function () {
            $(this).css({"border": "1px solid #f2f2f2"});
            $(".wall_goods_hover").css({"display":"none"});
        });
    }
}
function filter(min,max) {
    $.post("../data/list_dress.json", null, function (data, textStatus) {
        var _data = data,z=0;
        var  _loadImg="";
        for(var k in data){
            z++;
        }
        for(var i=0;i<20;i++){
            if( _data[i+1]["g_price"]>=min&& _data[i+1]["g_price"]<=max){
            _loadImg += '<div class="wall_goods_box fl"><a href="##" class="wall_goods_hover">找相似</a><a target="_blank"  href="detail.html?id=' +_data[i+1]["id"] + '" class="imageboxLink">' +
                    '<img src="../images/'+ _data[i+1]["g_url"] +'"><div class="goods_info fl">' +
                    '<p class="like_title fl">' + _data[i+1]["g_detail"] + '</p>' +
                    '<b class="price_info  fl">¥'+ _data[i+1]["g_price"] + '</b><p class="org_price fl">¥<span>'+ _data[i+1]["g_discount"] + '</span></p>' +
                    '<span class="fav_num fr">35961<img src="../images/start.png"></span></div></a></div>';
            }
        $(".wrap_hidden").html(_loadImg);
        }
    })
}