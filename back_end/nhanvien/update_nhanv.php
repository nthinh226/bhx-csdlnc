<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $manv=$_GET["manv"];
    $tennv=$_GET["tennv"];
    $ngaysinhnv=$_GET["ngaysinhnv"];
    $diachinv=$_GET["diachinv"];
    $sdtnv=$_GET["sdtnv"];
    $emailnv=$_GET["emailnv"];
    $anhnv=$_GET["anhnv"];
    $cccd=$_GET["cccd"];
    $sql="UPDATE `nhanvien` SET `manv`='".$manv."',`tennv`='".$tennv."',`ngaysinhnv`='".$ngaysinhnv."',`diachinv`='".$diachinv."',`sdtnv`='".$sdtnv."',`anhnv`='".$anhnv."',`cccd`='".$cccd."',`emailnv`='".$emailnv."' where manv='".$manv."'";
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