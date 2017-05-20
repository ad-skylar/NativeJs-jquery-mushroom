/**
 * Created by Administrator on 2017/3/20 0020.
 */
function slider() {
    var silde = $("#container");//大盒子
    var next = $("#lt");//下一张左按钮
    var prev = $("#gt");//右 前一张
    var index=0;
    var liLeftWidth=parseInt($("#container li").width()) + parseInt($("#container li").css("margin-left"));
    prev.finish().click(function() {
        index++;
        $(this).find("#container li:last").prependTo(silde);
        $("#container li").css({
            left: -liLeftWidth+"px",
        });
        $("#container li").eq(index).animate({
            left: "0px",
        }, 500);
        if (index == $("#container li").length-1) {
            index = 0
        }
    });
    next.finish().click(function(){
        index--;
        silde.animate({left: liLeftWidth + "px"},300,function(){
            $(this).find("#container li:first").appendTo(silde);
            $("#container li").css({
                left: -liLeftWidth+"px",
            });
            $("#container li").eq(index).animate({
                left: "0px",
            }, 500);
            if (index ==0 ) {
                index = $("#container li").length-1
            }
        });

    });
    function autoSlider() {
        setInterval(function () {
            if(silde.is(':animated')) {
                return;
            }
            $(silde).find("#container li:last").prependTo(silde);
            $(silde).css({
                left:  -liLeftWidth+"px"
            });
            // silde.animate({
            //     left: "0px"
            // }, 500);
        },3000);
    }
   // autoSlider()
}

