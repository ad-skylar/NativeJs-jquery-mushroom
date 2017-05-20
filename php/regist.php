<?php
/**
 * Created by PhpStorm.
 * User: Evil
 * Date: 2017/3/22
 * Time: 下午3:38
 */

    header("Content-type:text/html;charset=utf-8");
    function doPost(){
        $success=0;
        if($_POST["account"]!=null && $_POST["mobile"]!=null && $_POST["secret"]!=null) {
            $conn = new mysqli("127.0.0.1", "root", "root", "mushroom");
            mysqli_query($conn, "set character set 'utf8'");//读取数据时将字符集编码强制规范为utf-8
            mysqli_query($conn, 'set names utf8');//写入数据时将字符集编码强制规范为utf-8
            $value = "'" . $_POST["account"] . "','" . $_POST["mobile"] . "','" . $_POST["secret"] . "'";
            if ($conn->query("insert into sp_personal (p_account,p_mobile,p_secret) values (" . $value . ");") == true) {
                $success = 1;
            }
            $conn->close();
        }
        echo $success;
    }
    doPost();
?>



