<?php
$dir    = '../../upload/videos/';
$files1 = scandir($dir);
//$files2 = scandir($dir, 1);

//print_r($files1);
//print_r($files2);
$data =array();
$c=0;
foreach ($files1 as $imagename)
{
if($imagename!="." && $imagename!="..")	
{
$data[$c]["src"]= "http://$_SERVER[HTTP_HOST]"."/senshare/upload/videos/".$imagename;
$data[$c]["sub"]=$imagename;
$c++;
}
}
header('Content-Type: application/json');
echo json_encode($data);


?>