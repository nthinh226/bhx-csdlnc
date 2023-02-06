<?php
$hostname = 'localhost';//đia chi IP tỉnh javcript var hostname='localhost', String hostname='localhost'
$username = 'root'; //username cua he quan tri
$password = '';//mat khau
$dbname = "bookonline";
$port=3306; //MYSQL:3306, mariadb:3307
$conn = mysqli_connect($hostname, $username, $password,$dbname,$port);

if (!$conn) {
 die('Không thể kết nối: ' . mysqli_error($conn));
 exit();
}
//echo 'Kết nối thành công';
mysqli_set_charset($conn,"utf8");

?>
