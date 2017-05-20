function sidebar() {
    function hoverChange() {
        $(".sidebar-item").hover(function () {
            $(this).css({
                "background":"#ef2f23"
            })
        },function () {
            $(this).css({
                "background":"#202020"
            })
        })
    }
    hoverChange();
    function goTop() {
        $("#sidebar-top").click(function () {
            $('body,html').animate({ scrollTop: 0 }, 300);
            return false;
        })
    }
    $(".s-txt").click(function () {
       window.location="ShoppingCar.html"
    })
    goTop();
}