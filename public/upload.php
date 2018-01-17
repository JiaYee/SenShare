<?php
header('Access-Control-Allow-Origin: *');

$target_path = "C:\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\between_v1\\upload\\";

$target_path1 = "C:\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\between_v1\\upload\\optimize\\";

$target_path2 = "C:\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\between_v1\\upload\\thumbnail\\";

 $fullfilename=date("YmdHis"). basename( $_FILES['file']['name']);
$target_path = $target_path .$fullfilename;

$kaboom = explode(".", $fullfilename); // Split file name into an array using the dot
$fileExt = end($kaboom);


if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {

include_once("resizeimage.php");
$target_path1 = $target_path1 .$fullfilename;
 $target_path2 = $target_path2 .$fullfilename;
$resized_file =$target_path;
$wmax = 200;
$hmax = 150;
ak_img_resize($resized_file,$target_path1 , 800, 800, $fileExt);
ak_img_resize($resized_file,$target_path2, $wmax, $hmax, $fileExt);


echo "http://$_SERVER[HTTP_HOST]/between_v1/upload/".$fullfilename;


} else {
echo "0";
	}
?>


