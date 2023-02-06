<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $matg=$_GET["matg"];
    $tentg=$_GET["tentg"];
    $ngaysinhtg=$_GET["ngaysinhtg"];
    $diachitg=$_GET["diachitg"];
    $sdttg=$_GET["sdttg"];
    $emailtg=$_GET["emailtg"];
    $anhtg=$_GET["anhtg"];
    $sql="UPDATE `tacgia` SET `matg`='".$matg."',`tentg`='".$tentg."',`ngaysinhtg`='".$ngaysinhtg."',`diachitg`='".$diachitg."',`sdttg`='".$sdttg."',`anhtg`='".$anhtg."',`emailtg`='".$emailtg."' where matg='".$matg."'";
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