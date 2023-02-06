<?php

    require_once("../server.php");
    $s=$_GET["search"];
    $page=$_GET["page"];
    $record = $_GET["record"];
    $vt = $page*$record;
    $limit = 'limit '.$vt.",".$record;
    $sql="SELECT s.masach, s.tensach, s.sotrang, s.ngayxb, s.anhsach, s.filesach, s.giabia,k.tenkho, cd.tencd, nxb.tenxb FROM sach s,kho k, chude cd, nhaxb nxb WHERE s.makho = k.makho and s.macd = cd.macd and s.maxb = nxb.maxb and s.tensach like '%".$s."%' ".$limit;
    $sqltotal="SELECT COUNT(*) as total from sach s, nhaxb nxb, kho k,chude cd WHERE s.maxb=nxb.maxb and s.makho=k.makho and s.macd=cd.macd and s.tensach like '%".$s."%'";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $rstotal=mysqli_query($conn,$sqltotal);
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	

        $usertemp['masach']=$rows["masach"];
        $usertemp['tensach']=$rows["tensach"];
        $usertemp['sotrang']=$rows["sotrang"];
        $usertemp['ngayxb']=$rows["ngayxb"];
        $usertemp['anhsach']=$rows["anhsach"];
        $usertemp['filesach']=$rows["filesach"];
        $usertemp['giabia']=$rows["giabia"];
        $usertemp['tenkho']=$rows["tenkho"];
        $usertemp['tencd']=$rows["tencd"];
        $usertemp['tenxb']=$rows["tenxb"];
       
        array_push($mang,$usertemp);  
    }
    $row=mysqli_fetch_array($rstotal);
    $jsondata['total'] =(int)$row['total'];
    $jsondata['totalpage'] =ceil($row['total']/$record);
    $jsondata['page'] =(int)$page;
    $jsondata['items'] =$mang;
    echo json_encode($jsondata);
    mysqli_close($conn);
?>