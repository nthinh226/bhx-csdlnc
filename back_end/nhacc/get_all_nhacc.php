<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $page=$_GET["page"];
    $record = $_GET["record"];
    $vt = $page*$record;
    $limit = 'limit '.$vt.",".$record;
    $sql="SELECT * FROM `nhacc` WHERE tenncc like '%".$s."%' ".$limit;
    $sqltotal="SELECT COUNT(*) as total FROM nhacc WHERE tenncc like '%".$s."%';";

    $rs=mysqli_query($conn,$sql);//bộ resultset
    $rstotal=mysqli_query($conn,$sqltotal);
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['mancc']=$rows["mancc"];
        $usertemp['tenncc']=$rows["tenncc"];
        $usertemp['sdtncc']=$rows["sdtncc"];
        $usertemp['diachincc']=$rows["diachincc"];
        $usertemp['emailncc']=$rows["emailncc"];
        $usertemp['masothue']=$rows["masothue"];
        $usertemp['anhncc']=$rows["anhncc"];
       
        array_push($mang,$usertemp);  
    }
    $row=mysqli_fetch_array($rstotal);
    $jsondata['total'] =(int)$row['total'];
    $jsondata['totalpage'] =ceil($row['total']/$record);
    $jsondata['page'] =(int)$page;
    $jsondata['items'] =$mang;
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
   mysqli_close($conn);
?>