/**
 * Created by Administrator on 2017/3/24 0024.
 */
$(function () {
    $(".header").load("head.html", headSubNav);
    $(".sidebar").load("sidebar.html", sidebar);
    underLine();
    activeBanner();
    countDown("2017/05/17 16:57:50", $(".h"), $(".m"), $(".s"));
    visitAjax();
    changeTxt();
    fixed();
    skill();
});
function underLine() {
    $(".fastbuy a:eq(0)").click(function () {
        $(this).addClass("line");
        $(this).siblings().removeClass("line");
        $(".content-body,.skill,.active-banner").css("display","block");
        $(".content-body2").css("display","none");
    })
    $(".fastbuy a:eq(1)").click(function () {
        $(this).addClass("line");
        $(this).siblings().removeClass("line");
        $(".content-body,.skill,.active-banner").css("display","none");
        $(".content-body2").css("display","block");
    })
}
function activeBanner() {
    function creatImg() {
        var imgList = "";
        var spanList = "";
        for (var i = 0; i < 4; i++) {
            imgList += '<a href="detail.html"><img src="../images/abanner' + (i + 1) + '.jpg"></a>';
            spanList += '<span></span>';
        }
        $(".left-top-banner").append('<div class="banner_img">' + imgList + '</div><div class="tab">' + spanList + '</div><span class="left">&lt;</span><span class="right">&gt;</span>')
        bannerSlider()
    }

    creatImg();
    function bannerSlider() {
        var picNum = 0;
        $(".banner_img a:eq(0)").addClass("banner-show");
        $(".tab span:eq(0)").addClass("span-bj");
        $(".tab span").mouseover(function () {
            var index = $(this).index();
            $(".banner_img a:eq(" + index + ")").fadeIn(1000).siblings().hide();
            $(this).addClass("span-bj").siblings().removeClass("span-bj");
            picNum = index;
        })
        var timer = null;
        var sum = $(".tab span").length;
        /* 左右按钮*/
        function tab() {
            $(".left").click(function () {
                $(".banner_img a:eq(" + picNum + ")").fadeIn(500).siblings().hide();
                $(".tab span:eq(" + picNum + ")").addClass("span-bj").siblings().removeClass("span-bj");
                picNum++;
                if (picNum == sum) {
                    picNum = 0
                }
            })
            $(".right").click(function () {
                $(".banner_img a:eq(" + picNum + ")").fadeIn(500).siblings().hide();
                $(".tab span:eq(" + picNum + ")").addClass("span-bj").siblings().removeClass("span-bj");
                picNum--;
                if (picNum == -1) {
                    picNum = 4;
                }
            })
        }

        tab();
        /*计时器*/
        function play() {
            timer = setInterval(function () {
                $(".banner_img a:eq(" + picNum + ")").fadeIn(500).siblings().hide();
                $(".tab span:eq(" + picNum + ")").addClass("span-bj").siblings().removeClass("span-bj");
                picNum++;
                if (picNum == sum) {
                    picNum = 0
                }
            }, 3000);
        }

        $(".left-top-banner").mouseover(function () {
            $(".right").css("display", "block");
            $(".left").css("display", "block");
            clearInterval(timer);
        }).mouseout(function () {
            play();
            $(".right").css("display", "none");
            $(".left").css("display", "none");
        });
        play();
    }

}
function skill() {
    var _time = ["昨日 09:00", "昨日 22:00", "昨日 23:00", "今日 00:00", "今日 09:00", "今日 10:00", "今日 12:00", "今日 13:00", "今日 14:00", "今日 16:00", "今日 17:00", "今日 22:00", "今日 23:00", "明日 00:00", "明日 09:00", "明日 10:00", "明日 12:00", "明日 13:00", "明日 14:00", "明日 16:00", "明日 19:00"]
    var _skill = "";
    for (var i = 0; i < _time.length; i++) {
        _skill += '<a href="javascript:;" class="nav-item time_list fl"><p class="skill-time">' + _time[i] + '</p><p class="skill-status">已开抢</p></a>'
    }
    $(".skill-wrap").html('<a href="##" class="nav-item first" data-tab="-1"></a>' + _skill + '<a href="##" class="nav-item last" data-tab=""></a>');
    $(".skill-status").eq(_time.length / 2).html("快抢中");
    for (var j = 0; j < _time.length; j++) {
        if (j > _time.length / 2) {
            $(".skill-status").eq(j).html("即将开抢");
        }
    }
    var _one = 7, i = 0, index = 0;
    $(".skill-box .time_list").click(function () {
        $(".prev").css({"display":"block"});
        $(".next").css({"display":"block"});
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        i = index - _one;
        $(".skill-wrap").animate({
            "left": $(".skill-wrap").position().left - i * 133 + "px"
        }, 300);
        _one = index;
        // 切换图片事件
        $(".item-list .active_list:eq(" + index + ")").css("display", "block").siblings().css("display", "none");
    });
    $(".prev").click(function () {
        $(".next").css({"display":"block"});
        _one--;
        $(".skill-wrap").finish().animate({
            "left": $(".skill-wrap").position().left + 133 + "px"
        }, 300, function () {
            $(".time_list:eq(" +(_one-1) + ")").addClass("active").siblings().removeClass("active");
        })
        if ($(".skill-wrap").position().left >= -133) {
            $(".prev").css({"display":"none"})
        }
        $(".item-list .active_list:eq(" + _one + ")").css("display", "block").siblings().css("display", "none");

    })
    $(".next").click(function () {
        $(".prev").css({"display":"block"});
        _one++;
        $(".skill-wrap").finish().animate({
            "left": $(".skill-wrap").position().left - 133 + "px"
        }, 300,function () {
            $(".time_list:eq(" +(_one-1) + ")").addClass("active").siblings().removeClass("active");
        });
        if ($(".skill-wrap").position().left <= -2527) {
            $(".next").css("display","none");
        }
        $(".item-list .active_list:eq(" + _one + ")").css("display", "block").siblings().css("display", "none");

    })
}
function visitAjax() {
    var start=1,over=2;
    function lodingBox() {
        $.post("../data/active.json", null, function (data, textStatus) {
            if (textStatus == "success") {
                var j = 0;
                for (var k in data) {
                    j++;
                    var _item = "";
                    var _collection = "";
                    for (var i = 0; i < data[k]["img_url"].length; i++) {
                        _item += '<div class="item item' + (i + 1) + ' fl">' +
                            '<a href="detail.html" class="item-img fl"><img src="../images/' + data[k]["img_url"][i] + '"></a>' +
                            '<a href="detail.html" class="item-detail fl"><div class="title">' + data[k]["title"][i] + '</div><div class="price"><span>秒杀价<span class="cur">¥' + data[k]["now_price"][i] + '</span></span><del class="old">¥' + data[k]["ori_price"][i] + '</del></div><div class="status-bar-text">库存' + data[k]["status"][i] + '件</div><div class="status-bar"><div class="status-bar-progress" style="width: ' + data[k]["length"][i] + ';"></div></div><div class="buy-btn-box"><span class="buy-btn">立即抢购</span>' +
                            '<span class="left-text">' + data[k]["follow"][i] + '人关注</span></div><div class="soldout-icon"></div></a></div>'
                    }
                    _collection += '<div class="active_list item' + j + '">' + _item + '</div>';
                     $(".item-list").append(_collection);
                }
            }
        })
    }
    lodingBox();
    function load2() {
        $.post("../data/active.json", null, function (data, textStatus) {
            if (textStatus == "success") {
                for (var j=start;j<over;j++) {
                    var _item2="",_collection2 = "";
                    for (var i = 0; i < data["part"+j]["img_url"].length; i++) {
                          if (Number(data["part"+j]["status"][i])!=0) {
                            _item2 += '<div class="item item' + (i + 1) + ' fl">' +
                                '<a href="detail.html" class="item-img fl"><img src="../images/' + data["part"+j]["img_url"][i] + '"></a>' +
                                '<a href="detail.html" class="item-detail fl"><div class="title">' + data["part"+j]["title"][i] + '</div><div class="price"><span>秒杀价<span class="cur">¥' + data["part"+j]["now_price"][i] + '</span></span><del class="old">¥' + data["part"+j]["ori_price"][i] + '</del></div><div class="status-bar-text">已抢' + data["part"+j]["status"][i] + '件</div><div class="status-bar"><div class="status-bar-progress" style="width: ' + data["part"+j]["length"][i] + ';"></div></div><div class="buy-btn-box"><span class="buy-btn">立即抢购</span>' +
                                '<span class="left-text">仅剩' + data["part"+j]["remainder"][i] + '件</span></div><div class="soldout-icon"></div></a></div>'
                        }
                    }
                    _collection2 += '<div class="active_list item' + j + '">' + _item2 + '</div>';
                    $(".item-lists").append(_collection2);
                }
            }
        })

    }
    load2()
    $(window).scroll(function () {
        if($(document).scrollTop() + $(window).height()== $(document).height()){
            start=over;
            over++;
            if(over<=22){
                load2();
            }
        }
    })
}

function changeTxt() {
    var timer = setTimeout(function () {
        clearTimeout(timer);
        for (var z = 0; z < $(".status-bar-text").length; z++) {
            if ($(".status-bar-text").eq(z).html() == "库存0件") {
                $(".left-text").eq(z).html("仅剩0件");
                $(".soldout-icon").eq(z).css("display", "block");
                $(".buy-btn").eq(z).html("再逛逛");
                $(".buy-btn").eq(z).css({
                    "background": "none",
                    "color": "#666"
                })
            }
        }
    }, 100)
}
function fixed() {
    $(window).scroll(function () {
        if ($(document).scrollTop() >= 499) {
            $(".nav-box").css({
                "position": "fixed",
                "top": 0,
                "width":"1200px"
            })
            $(".aside").addClass("fixed")
            if($(document).scrollTop() + $(window).height()>= $(document).height()-300){
                $(".aside").addClass("auto");
            }
        } else{
            $(".nav-box").css({
                "position": "relative",
                "width":"100%"
            })
            $(".aside").removeClass("fixed");
            $(".aside").removeClass("auto");
        }
    })
}

