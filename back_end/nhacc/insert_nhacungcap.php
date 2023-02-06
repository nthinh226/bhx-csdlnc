<?php
require_once("../server.php");
//server nhận dữ liệu từ client gửi lên
    $mancc=$_GET["mancc"];
    $tenncc=$_GET["tenncc"];
    $diachincc=$_GET["diachincc"];
    $sdtncc=$_GET["sdtncc"];
    $emailncc=$_GET["emailncc"];
    $masothue=$_GET["masothue"];
    $anhncc=$_GET["anhncc"];
    $sql="insert into nhacc(mancc,tenncc,diachincc,sdtncc,emailncc,masothue,anhncc) values('".$mancc."','".$tenncc."','".$diachincc."','".$sdtncc."','".$emailncc."','".$masothue."','".$anhncc."')";
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