<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $makh=$_GET["makh"];
    $tenkh=$_GET["tenkh"];
    $ngaysinh=$_GET["ngaysinh"];
    $diachikh=$_GET["diachikh"];
    $sdtkh=$_GET["sdtkh"];
    $emailkh=$_GET["emailkh"];
    $loaikh=$_GET["loaikh"];
    $anhkh=$_GET["anhkh"];
    $sql="insert into khachang(makh,tenkh,ngaysinh,diachikh,sdtkh,emailkh,loaikh,anhkh)
    values('".$makh."','".$tenkh."','".$ngaysinh."','".$diachikh."','".$sdtkh."','".$emailkh."','".$loaikh."','".$anhkh."')";
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