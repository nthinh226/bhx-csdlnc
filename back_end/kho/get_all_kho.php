<?php

    require_once("../server.php");
    $sql="SELECT `makho`, `tenkho` FROM `kho`";
    $rs=mysqli_query($conn,$sql);//bộ resultset
    $mang=array();
	while ($rows=mysqli_fetch_array($rs)){	
      //  echo $rows["manhom"]."   ".$rows["tennhom"]."<br>";
        $usertemp['makho']=$rows["makho"];
        $usertemp['tenkho']=$rows["tenkho"];
       
        array_push($mang,$usertemp);  
    }
    $jsondata['items'] =$mang;	
    echo json_encode($jsondata); //trả về cho client 1 chuỗi json dạng mảng
    //{items:[{manhom:'HS',Tennhom:'hải sản},{manhom:'HS',Tennhom:'hải sản},{manhom:'HS',Tennhom:'hải sản}]}
    mysqli_close($conn);
?>