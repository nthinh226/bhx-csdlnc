<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $maxb=$_GET["maxb"];
    $tenxb=$_GET["tenxb"];
    $diachixb=$_GET["diachixb"];
    $sdtxb=$_GET["sdtxb"];
    $emailxb=$_GET["emailxb"];
    $anhxb=$_GET["anhxb"];
    $latxb=$_GET["latxb"];
    $lngxb=$_GET["lngxb"];
    $sql="UPDATE `nhaxb` SET `maxb`='".$maxb."',`tenxb`='".$tenxb."',`diachixb`='".$diachixb."',`sdtxb`='".$sdtxb."',`anhxb`='".$anhxb."',`latxb`='".$latxb."',`lngxb`='".$lngxb."',`emailxb`='".$emailxb."' where maxb='".$maxb."'";
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