$(function () {
    $(".header").load("html/head.html",headSubNav);
    $(".search").load("html/search.html",search);
    $(".sidebar").load("html/sidebar.html",sidebar);
    imgLists();
    addNavlist();
    banner();
    fastBuy();
    modelRotate();
    smallModel();
    silder();
    preference();
    autoLoding();
});
//图片分类会场
function imgLists() {
    $.post("data/multiple.json", null, function (data, textStatus) {
        var _imgList = "";//图片分类会场
        var _data=data;
        if (textStatus == "success") {
            //图片分类会场
            for (var i = 0; i < _data["active_img"].length; i++) {
                _imgList += '<div><a href="##"><img src="images/' + _data["active_img"][i] + '"> </a></div>';
            }
            $(".active_img").html(_imgList);
        }
    });
}
function addNavlist() {
    $.post("data/sub_nav.json", null, function (data, textStatus) {
        var _data = data;
        var _code = "";
        if (textStatus == "success") {
            for (var k in _data) {
                for (var i = 0; i < 1; i++) {
                    _code += '<li><a href="html/list.html"  id="sub' + k + '"> ' + _data[k]["nav_type"] + '</a><a href="html/list.html">' + _data[k]["nav_kind"]["type1"] + '</a></a><a href="html/list.html">' + _data[k]["nav_kind"]["type3"] + '</a></a><a href="html/list.html">' + _data[k]["nav_kind"]["type3"] + '</a></li>';
                }
                $(".nav_list").html(_code);
                var _code2 = "";
                var _code1 = "";
                var _code3 = "";
                for (var j = 0; j < _data[k]["top"]["001"]["content"].length; j++) {
                    _code1 += '<a href="##"> ' + _data[k]["top"]["001"]["content"][j] + '</a>';
                }
                for (var j = 0; j < _data[k]["center"]["001"]["content"].length; j++) {
                    _code2 += '<a href="##"> ' + _data[k]["center"]["001"]["content"][j] + '</a>';
                }
                for (var j = 0; j < _data[k]["bottom"]["001"]["content"].length; j++) {
                    _code3 += '<a href="##"> ' + _data[k]["bottom"]["001"]["content"][j] + '</a>';//9个a
                }
                var _codeImg = "";
                for (var s = 0; s < 5; s++) {
                    _codeImg += "<img src='images/" + _data[k]["bottom_brand"][s] + "'/>"
                }

                $(".show_list").append('<div class="more_content"><h3>' + _data[k]["nav_type"] + '</h3><dl><dt><a href="html/activeCenter.html"> ' + _data[k]["top"]["001"]["title"] + '</a><a href="html/activeCenter.html">更多</a></dt><dd>' + _code1 + '</dd></dl><dl><dt><a href="html/activeCenter.html"> ' + _data[k]["center"]["001"]["title"] + '</a><a href="html/activeCenter.html">更多</a></dt><dd>' + _code2 + '</dd></dl><dl><dt><a href="##" href="html/activeCenter.html"> ' + _data[k]["bottom"]["001"]["title"] + '</a><a href="html/activeCenter.html">更多</a></dt><dd>' + _code3 + '</dd></dl><dl>' + _codeImg + '</dl><ul class="left_list"><img src="images/left.jpg"></ul></div>');
            }
            navMoreContent();
        }
    })
    function navMoreContent() {
        $(".nav_list li").mouseenter(function () {
            var i = $(this).index();//下标
            $(this).addClass('select').siblings().removeClass('select');
            $(".show_list div").eq(i).show().siblings().hide();
            $(".show_list_content").css("display", "block");
        });
    }
    $(".page_nav").mouseleave(function () {
        $(".show_list_content").css("display", "none");
    })
}
function banner() {
    function creatImg(_num) {
        var imgList = "";
        var spanList = "";
        for (var i = 0; i < _num; i++) {
            imgList += '<span><a href="##"><img src="images/banner' + (i + 1) + '.jpg"></a></span>';
            spanList += '<li></li>';
        }
        $("#mid_banner").html(imgList);
        $(".seven_span").html(spanList);
    }
    creatImg(7);
    var picNum = 0;
    function bannerSlider() {
        $(".seven_span li:eq(0)").addClass("active");
        $(".seven_span li").mouseover(function () {
            var index = $(this).index();
            $("#mid_banner span:eq(" + index + ")").fadeIn(1000).siblings().hide();
            $(this).addClass("active").siblings().removeClass("active");
            picNum = index;
        })
        var timer = null;
        var arrColor = ["#febac5", "#feb469", "#d092f3", "#aac5f0", "#ffc2c1", "#abebea", "#a7e0ab"]
        var sum = $(".seven_span li").length;
        /*计时器*/
        function play() {
            timer = setInterval(function () {
                $("#mid_banner span:eq(" + picNum + ")").fadeIn(500).siblings().hide();
                $(".seven_span li:eq(" + picNum + ")").addClass("active").siblings().removeClass("active");
                $(".banner").css({
                    "height": "440px",
                    "background": arrColor[picNum]
                });
                picNum++;
                if (picNum == sum) {
                    picNum = 0
                }
            }, 2000);
        }
        $("#mid_banner").mouseover(function () {
            clearInterval(timer);
        }).mouseout(function () {
            play();
        });
        play();
    }
    bannerSlider();
}
//限时快抢
function fastBuy() {
    function creatELement() {
        var _part="";
        var data={
            "h3":["一元抢好货","0.01抽好运"],
            "txt":["整点拼手速","一分钱幸运礼遇"],
            "img_url":["skill2.png","skill3.png"]
        }
        for(var i=0;i<2;i++){
            _part+='<div class="small_block"><div class="time_title " ><h3>'+data["h3"][i]+'</h3><p>'+data["txt"][i]+'</p></div><img src="images/'+data["img_url"][i]+'"></div>'
        }
        $(".skill .wrap").html(' <div class="one_yuan fl">' +
            '<a class="main_block" href="html/activeCenter.html"><div class="time1"><h3>限时快抢</h3><div class="spcate-timer"><span class="h">00</span> : <span class="m">00</span> : <span class="s">00</span></div></div>' +
            '<div class="skill_img"><img src="images/skill1.png">' +
            '<!--快抢-->' +
            '<div class="time2"><p>快抢价</p><span>79.00</span></div></div></a>' +
            '<a class="main_block2" href="html/activeCenter.html">'+_part+'</a></div>' +
            '<div class="skill_brand fl"><div class="maininfos fl"><div class="time_title time_title2"><h3>团购特卖</h3><p>风格大牌春上新<span style="color: #ff5577">10点上新</span></p></div>' +
            '<img class="skill_clo" src="images/skill4.png"></div>' +
            '<a class="main_block2" href="html/activeCenter.html"><div class="small_block">' +
            '<div class="time_title " ><h3>品牌团</h3>' +
            '<div class="spcate-timer"><span class="hh">00</span> : <span class="mm">00</span> : <span class="ss">00</span></div></div><img src="images/skill5.png"> </div>' +
            ' <div class="small_block"><div class="time_title"><h3>入仓质检</h3><p style="color: #ff5577;">精选好货 劣一赔十</p></div>' +
            '<img src="images/skill6.png"></div></a></div></div>' +
            '<div class="buying fl"><div class="maininfos fl" style="border: none;background: #fff;width: 100%">' +
            '<div class="time_title time_title2"><h3>美妆团</h3><p>超值大牌 超值满减</p></div>' +
            '<img class="skill_clo" src="images/skill7.png"></div></div>');
        countDown("2017/5/17 16:33:50",$(".h"),$(".m"),$(".s"));
        countDown("2017/5/17 19:30:50",$(".hh"),$(".mm"),$(".ss"));
    };
    creatELement();
    function imgPlay() {
        $(".skill img").hover(function () {
            $(this).animate({
                "margin-left":"7px"
            },300)
        },function () {
            $(this).animate({
                "margin-left":"0px"
            },300)
        })
    }
    imgPlay()
}
// 红人穿搭
function modelRotate() {
    var _img = "", txt = "";
    var _arr = [];
    var a = 1;
    function creatElement() {
        $.post("data/model.json", null, function (data, textStatus) {
            var _data = data;
            if (textStatus == "success") {
                for (var k in _data) {
                    _arr.push(_data);
                }
                for (var i = 0; i < 5; i++) {
                    _img = '<li><img src="images/' + _arr[i][i + 1]["img"] + '"><p>' + _arr[i][i + 1]["txt"] + '</p></li>';
                    $(".model_change").append(_img);
                }
            }
            //换图
            var num = 0;
            var timer = null;
            var timer = null;
            timer = setInterval(function () {
                $(".model_change li:eq(" + num + ")").addClass("rotate").siblings().removeClass("rotate");
                $(".model_change li:eq(" + num + ")").html('<img src="images/' + _arr[a][a]["img"] + '"><p>' + _arr[a][a]["txt"] + '</p>');
                num = parseInt(Math.random() * 4);
                a = parseInt(Math.random() * 14 + 1);
            }, 5000);
        })


    }

    creatElement();
}
function smallModel() {
    // 右侧小图
    $.post("data/smallModel.json", null, function (data, textStatus) {
        var _data = data;
        var _arr2 = [];
        var smallImg = "";
        if (textStatus == "success") {
            for (var k in _data) {
                _arr2.push(_data);
            }
            for (var i = 0; i < 6; i++) {
                smallImg = '<li><img src="images/' + _arr2[i][i + 1]["img"] + '"><p>' + _arr2[i][i + 1]["txt"] + '</p></li>';
                $(".small_model").append(smallImg);
            }
        }
    });
    $.post("data/popular.json", null, function (data, textStatus) {
        var _data = data;
        var _arr2 = [];
        var smallImg = "";
        if (textStatus == "success") {
            for (var k in _data) {
                _arr2.push(_data);
            }
            for (var i = 0; i < 6; i++) {
                smallImg += '<li><img src="images/' + _arr2[i][i + 1]["img"] + '"><p>' + _arr2[i][i + 1]["txt"] + '</p></li>';

            }
            $(".popular").html('<h3>流行元素</h3>' + smallImg);
            Imghover();
        }
    })
    function Imghover() {
        $(".popular img").hover(function () {
            $(this).css({
                "opacity": .5
            });
            var _current = this;
            $(".popular img").each(function (i) {
                if ($(".popular img")[i] == _current) {
                    $(".popular p:eq(" + i + ")").css({
                        "text-decoration": "underline"
                    });
                    return;
                }
            });
        }, function () {
            $(this).css({
                "opacity": 1
            });
            $(".popular p").css({
                "text-decoration": "none"
            });
        });
    }
}
// 爱购优选 女装 女鞋 服饰 男友
function preference() {
    $.post("data/preference.json", null, function (data, textStatus) {
        var _arr = [];
        var z=0;
        for (k in data) {
            _arr.push(data);
        }
        var _data = data;
        var k=0;
        for(var z in _data["part1"]["middle"]){
            k++;
        }
        var h=0;
        for(var w in _data["part1"]["right"]){
            h++;
        }
        for (var sum = 1; sum < _arr.length + 1; sum++) {
            var topSixA = "", prefer_top = "", _data = data;
            var _leftSixA = "", pre_left = "";
            var _middleSixA = "", pre_middle = "";
            var pre_right = "", _preRight = "", _sumPart = "";
            //创建爱购优选头部里面6个a
            for (var i = 0; i < _data["part" + sum]["top"]["top_nav"].length; i++) {
                topSixA += '<a class="topLink" href="html/activeCenter.html">' + _data["part" + sum]["top"]["top_nav"][i] + '</a> '
            }
            //爱购优选top整体拼接
            prefer_top = '<div class="prefer_top fl"><span class="sideIcon" style="background-color: #B4A48D"></span>' +
                '<h3 class="title">' + _data["part" + sum]["top"]["title"] + '</h3>' +
                '<div class="cateLinkBox fl">热门搜索：' + topSixA + '</div>' +
                '<a class="checkMore" href="html/activeCenter.html">查看全部 ></a></div>';
            // 创建爱购优选left里面的6个a
            for (var j = 0; j < _data["part" + sum]["left"]["left_nav"].length; j++) {
                _leftSixA += '<a  href="html/activeCenter.html">' + _data["part" + sum]["left"]["left_nav"][j] + '</a>';
            }
            //爱购优选left整体拼接
            pre_left = '<div class="pre_left pre_left'+sum+' fl"><div class="lazy_data fl">' + _leftSixA + '</div>' +
                '<div class="prefer_top_title">' + _data["part" + sum]["left"]["left_title"] + '</div><p>' + _data["part" + sum]["left"]["left_p"] + '</p>' +
                '<div class="prefer_top_img"><img src="images/' + _data["part" + sum]["left"]["left_img"] + '"></div></div>';
            //爱购优选middle整体拼接
            for (var a = 1; a < k+1; a++) {
                _middleSixA += '<a><div class="middle-title"> ' + _data["part" + sum]["middle"][a][0] + ' </div>' +
                    '<div class="middle-subTitle"> ' + _data["part" + sum]["middle"][a][1] + '</div>' +
                    '<div class="middle_bottomImg"><img src="images/' + _data["part" + sum]["middle"][a][2] + '"></div>' +
                    '</a>'
            }
            pre_middle = '<div class="pre_middle fl">' + _middleSixA + '</div>';
            //爱购优选right循环4次 包括右侧内容不同区域
            try {
                for (var b = 1; b < h+1; b++) {
                    _preRight += '<a href="###" class="recGoodsBox">' +
                        '<div class="recGoodsImg  fl"><img class="" src="images/' + _data["part" + sum]["right"][b][0] + '" alt=""></div>' +
                        '<div class="recGoodsInfo fl"><div class="goodsDesc fl"> ' + _data["part" + sum]["right"][b][1] + '</div>' +
                        '<div class="goodsPricevfl"> ' + _data["part" + sum]["right"][b][2] + '</div></div></a>';
                }
                //爱购优选right整体拼接
                pre_right = '<div class="pre_right fl"><div class="right_title fl">大家都在买</div>' +
                    '<div class="changeNew fr"><span class="freshe"></span>换一批</div>' + _preRight + '</div>';
            } catch (e) {
                for (var c = 0; c <_data["part" + sum]["right"]["imgaesList"].length; c++) {
                    _preRight += '<a href="###" class="pre_brand"><img src="images/' + _data["part" + sum]["right"]["imgaesList"][c] + '"></a>';
                }
                //爱购优选right整体拼接
                pre_right = '<div class="pre_right fl">' + _preRight + '</div>';
            }
            //全部
            _sumPart = '<div class="prefer flow">' + prefer_top + pre_left + pre_middle + pre_right + '</div>';
            $(".preferPart .wrap").append(_sumPart);
            preferenceHover();
        }
    })

}
function autoLoding() {
    var i = 0;
    function creatElement() {
            $.post("data/autoLoading.json", null, function (data, textStatus) {
                var _data = data;
                var  _loadImg="";
                i++;
                for(var k in _data){
                    _loadImg = '<div class="wall_goods_box fl"><a href="html/activeCenter.html" class="wall_goods_hover">找相似</a><a href="html/detail.html" class="imageboxLink">' +
                        '<img src="images/'+ _data[k]["g_url"] +'"><div class="goods_info fl">' +
                        '<p class="like_title fl">' + _data[k]["g_detail"] + '</p>' +
                        '<b class="price_info  fl">¥'+ _data[k]["g_price"] + '</b><p class="org_price fl">¥<span>'+ _data[k]["g_discount"] + '</span></p>' +
                        '<span class="fav_num fr">35961<img src="images/start.png"></span></div></a></div>';
                    $(".wrap_hidden").append(_loadImg);
                }
                boxHover();
            })

    }
    //获取滚动条当前的位置
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    //获取当前窗口可视范围的高度
    function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        }
        else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }
    //获取文档完整的高度
    function getScrollHeight() {
        var scorllHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        return scorllHeight;
    }
    window.onscroll = function () {
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
            var sum = 3;
            var timer = null;
            function ajaxServise() {
                if (i <3) {
                    timer = setTimeout(creatElement(), 10);
                }
                if (i == sum) {
                    clearTimeout(timer);
                }
            }
            ajaxServise();
        }
    }
}
function preferenceHover() {
    $(".prefer img").hover(function () {
        $(this).animate({"margin-top":"-5px"},500);
    },function () {
        $(this).animate({"margin-top":"0"},500);
    })
}
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
