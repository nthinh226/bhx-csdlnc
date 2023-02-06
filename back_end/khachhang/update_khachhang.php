<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $makh=$_GET["makh"];
    $tenkh=$_GET["tenkh"];
    $ngaysinh=$_GET["ngaysinh"];
    $diachikh=$_GET["diachikh"];
    $sdtkh=$_GET["sdtkh"];
    $emailkh=$_GET["emailkh"];
    $anhkh=$_GET["anhkh"];
    $loaikh=$_GET["loaikh"];
    $sql="UPDATE `khachang` SET `makh`='".$makh."',`tenkh`='".$tenkh."',`ngaysinh`='".$ngaysinh."',`diachikh`='".$diachikh."',`sdtkh`='".$sdtkh."',`anhkh`='".$anhkh."',`loaikh`='".$loaikh."',`emailkh`='".$emailkh."' where makh='".$makh."'";
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