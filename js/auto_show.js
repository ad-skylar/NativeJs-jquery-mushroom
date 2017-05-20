function silder() {
    var box = $(".model_content");//overflowHiden 的盒子
    var container = $("#container");//轮播的大盒子
    var oneWidth = container.find("li").eq(0).width();//找到第一个Width
    var number = $("#dotBox a");//几个小点
    var index = 0;//公共下标
    var timer = 0;//定时器
    /**
     * 给每一个数字添加点击事件
     */
    number.on("click", function () {
        $(this).addClass("dot_show").siblings().removeClass("dot_show");
        index = $(this).index();
        container.animate({
            "left": -(oneWidth * index)
        });
    });
    $("#lt").stop(true).click(function () {
        index++;
        if (index == number.length) {
            index = 0
        }
        number.eq(index).trigger("click");
    });
    $("#gt").stop(true).click(function () {
        index--;
        if (index == number.length) {
            index = 0
        }
        number.eq(index).trigger("click");
    });
    timer = setInterval(function () {
        index++;
        if (index == number.length) {
            index = 0
        }
        number.eq(index).trigger("click");
    }, 4000);

    /**
     * 鼠标悬停停止轮播
     */
    $(".model_content,#dotBox a").hover(function () {
        $("#lt,#gt").animate({
           // opacity: "1"
        }, 200);
        clearInterval(timer);
    }, function () {
        $("#lt,#gt").animate({
           // "opacity": 0
        }, 500);
        timer = setInterval(function () {
            index++;
            if (index == number.length) {
                index = 0
            }
            number.eq(index).trigger("click");
        }, 4000);
    })
}
