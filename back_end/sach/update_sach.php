<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $masach=$_GET["masach"];
    $tensach=$_GET["tensach"];
    $sotrang=$_GET["sotrang"];
    $giabia=$_GET["giabia"];
    $anhsach=$_GET["anhsach"];
    $filesach=$_GET["filesach"];
    $ngayxb=$_GET["ngayxb"];
    $makho=$_GET["makho"];
    $macd=$_GET["macd"];
    $maxb=$_GET["maxb"];
    $sql="UPDATE sach SET tensach ='".$tensach."',sotrang ='".$sotrang."',giabia ='".$giabia."',anhsach ='".$anhsach."', filesach ='".$filesach."', ngayxb ='".$ngayxb."', makho ='".$makho."', macd ='".$macd."', maxb ='".$maxb."' where masach='".$masach."'";
    if (mysqli_query($conn, $sql)) {
        if(mysqli_affected_rows($conn)>0){         
         $res["success"] = 1; //[1]
        }
        else{
            $res["success"] = 0; //[0] //that bai
        }
    } else {
        $res["success"] = 0; //{success:0}  //that bai
    }   
    echo json_encode($res);//{success:1}  ///đáp trả
    mysqli_close($conn);
?>