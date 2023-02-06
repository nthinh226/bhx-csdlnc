<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $page=$_GET["page"];
    $record = $_GET["record"];
    $vt = $page*$record;
    $limit = 'limit '.$vt.",".$record;
    $sql="SELECT * FROM `nhanvien` WHERE tennv like '%".$s."%' ".$limit;
    $sqltotal="SELECT COUNT(*) as total FROM nhanvien WHERE tennv like '%".$s."%';";

    $rs=mysqli_query($conn,$sql);//bộ resultset
    $rstotal=mysqli_query($conn,$sqltotal);
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['manv']=$rows["manv"];
        $usertemp['ngaysinhnv']=$rows["ngaysinhnv"];
        $usertemp['tennv']=$rows["tennv"];
        $usertemp['sdtnv']=$rows["sdtnv"];
        $usertemp['diachinv']=$rows["diachinv"];
        $usertemp['emailnv']=$rows["emailnv"];
        $usertemp['anhnv']=$rows["anhnv"];
        $usertemp['cccd']=$rows["cccd"];
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