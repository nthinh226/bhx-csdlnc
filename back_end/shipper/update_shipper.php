<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $mashipper=$_GET["mashipper"];
    $tenshipper=$_GET["tenshipper"];
    $sdtshipper=$_GET["sdtshipper"];
    $emailshipper=$_GET["emailshipper"];
    $anhshipper=$_GET["anhshipper"];
    $sql="UPDATE `shipper` SET `mashipper`='".$mashipper."',`tenshipper`='".$tenshipper."',`sdtshipper`='".$sdtshipper."',`anhshipper`='".$anhshipper."',`emailshipper`='".$emailshipper."' where mashipper='".$mashipper."'";
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