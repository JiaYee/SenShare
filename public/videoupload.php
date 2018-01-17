<?php
header('Access-Control-Allow-Origin: *');
$target_path = "C:/Inetpub/vhosts/betweenlifestyle.com/httpdocs/senshare/upload/";

 $fullfilename=date("YmdHis"). basename( $_FILES['file']['name']);
$target_path = $target_path .$fullfilename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {

 echo "http://$_SERVER[HTTP_HOST]/senshare/upload/".$fullfilename;


} else {
echo "0";
	}
?>