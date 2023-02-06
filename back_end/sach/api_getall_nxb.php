<?php

    require_once("../server.php");
    $sql="SELECT `maxb`, `tenxb`, `diachixb`, `sdtxb`, `emailxb`, `anhxb`, `latxb`, `lngxb` FROM `nhaxb`";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
        $usertemp['maxb']=$rows["maxb"];
        $usertemp['tenxb']=$rows["tenxb"];
        $usertemp['diachixb']=$rows["diachixb"];
        $usertemp['sdtxb']=$rows["sdtxb"];
        $usertemp['emailxb']=$rows["emailxb"];
        $usertemp['anhxb']=$rows["anhxb"];
        $usertemp['latxb']=$rows["latxb"];
        $usertemp['lngxb']=$rows["lngxb"];
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
    //{items:[{manhom:'HS',Tennhom:'hải sản},{manhom:'HS',Tennhom:'hải sản},{manhom:'HS',Tennhom:'hải sản}]}
    mysqli_close($conn);
?>