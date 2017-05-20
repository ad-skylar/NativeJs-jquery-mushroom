/**
 * Created by Administrator on 2017/3/26 0026.
 */
function countDown(_endTime,obj1,obj2,obj3) {
    var timer=0;
    timer=setInterval( time , 1000 );
    function time(){
        var endTime = new Date(_endTime); //结束时间
        var startTime = new Date(); //开始时间
        var time = endTime.getTime() - startTime.getTime();
        if( time <= 0 ){
            window.clearInterval(timer);
            return;
        }
        var hours = parseInt( time/1000/60/60 );
        var min = parseInt( time/1000/60%60 );
        var sec = parseInt( time/1000%60 );
        function twoTo( n ){
            if( n<10 ){
                n = "0"+ n;
            }
            return n;
        }
        obj1.html(twoTo( hours ));
        obj2.html(twoTo( min ));
        obj3 .html(twoTo( sec ));
    }
}
