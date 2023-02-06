<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $page=$_GET["page"];
    $record = $_GET["record"];
    $vt = $page*$record;
    $limit = 'limit '.$vt.",".$record;
    $sql="SELECT * FROM `shipper` WHERE tenshipper like '%".$s."%' ".$limit;
    $sqltotal="SELECT COUNT(*) as total FROM shipper WHERE tenshipper like '%".$s."%';";

    $rs=mysqli_query($conn,$sql);//bộ resultset
    $rstotal=mysqli_query($conn,$sqltotal);
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
    
        $usertemp['mashipper']=$rows["mashipper"];
        $usertemp['tenshipper']=$rows["tenshipper"];
        $usertemp['sdtshipper']=$rows["sdtshipper"];
        $usertemp['emailshipper']=$rows["emailshipper"];
        $usertemp['anhshipper']=$rows["anhshipper"];
       
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