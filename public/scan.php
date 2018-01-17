<?php
header('Access-Control-Allow-Origin: *');

$target_path = "C:\\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\senshare\\upload\\";

$target_path1 = "C:\\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\senshare\\upload\\optimize\\";

$target_path2 = "C:\\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\senshare\\upload\\thumbnail\\";




$i =1;
$files = scandir($target_path);
foreach($files as $file) 
{
  	include_once("resizeimage.php");
  	if($i > 251 && $i < 300 )
	{
  		
		$path1 = $target_path1 .$file;
 		$path2 = $target_path2 .$file;
		$resized_file =$target_path .$file;


		$kaboom = explode(".", $file); // Split file name into an array using the dot
		$fileExt = end($kaboom);
		
		$wmax = 200;
		$hmax = 150;
		ak_img_resize($resized_file,$path1 , 800, 800, $fileExt);
		ak_img_resize($resized_file,$path2, $wmax, $hmax, $fileExt);	

//echo $file;
//echo "<br>";


	}
	$i +=1;

}

?>
