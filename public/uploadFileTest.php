<?php
//properties of the uploaded file
$name= "1500537167792.jpg";
$type= "jpg";
$size= "4929869";
$temp= "1500537167792.jpg";
$error= 0;
$target_path = "C:/Inetpub/vhosts/betweenlifestyle.com/httpdocs/senshare/upload/";
$target_path1 = "C:\\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\senshare\\upload\\optimize\\";
$target_path2 = "C:\\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\senshare\\upload\\thumbnail\\";


function ak_img_resize($target, $newcopy, $w, $h, $ext, $isOpt) {
    list($w_orig, $h_orig) = getimagesize($target);
    $scale_ratio = $w_orig / $h_orig;
    if (($w / $h) > $scale_ratio) {
           $w = $h * $scale_ratio;
    } else {
           $h = $w / $scale_ratio;
    }
    $im = "";
    $ext = strtolower($ext);
    if ($ext == "gif"){
      $im = imagecreatefromgif($target);
    } else if($ext =="png"){
      $im = imagecreatefrompng($target);
    } else {
      $im = imagecreatefromjpeg($target);
    }
    $tci = imagecreatetruecolor($w, $h);


	$stamp = imagecreatefrompng("C:\\Inetpub\\vhosts\\betweenlifestyle.com\\httpdocs\\senshare\\upload\\watermark.png");

	// Set the margins for the stamp and get the height/width of the stamp image
	$marge_left = 20;
	$marge_bottom = 20;
	$sx = imagesx($stamp);
	$sy = imagesy($stamp);

	// Copy the stamp image onto our photo using the margin offsets and the photo
	//imagecopy($im, $stamp, $marge_left, imagesy($im) - $sy - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp));
	// width to calculate positioning of the stamp.
	if ($isOpt>0)
		imagecopy($im, $stamp, $marge_left, imagesy($im) - $sy - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp));


	imagecopyresampled($tci, $im, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);

		// imagecopyresampled(dst_img, src_img, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h)
		// imagecopyresampled($tci, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);


	imagejpeg($tci, $newcopy, 95);
}


if ($error > 0)
    die("Error uploading file! code $error.");
else {
    if($size > 250000000)//condition for the file
    {
		echo $size;
		echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Format not allowed or file size is too big")));
    }
    else
    {
		$path1 = $target_path1 .$name;
 		$path2 = $target_path2 .$name;
		$resized_file =$target_path .$name;

		$kaboom = explode(".", $name); // Split file name into an array using the dot
		$fileExt = end($kaboom);

		//$data = getimagesize($resized_file);
		//$wmax = $data[0];
		//$hmax = $data[1];

		$wmax = 200;
		$hmax = 150;
		//move_uploaded_file($temp, "../../upload/" .$name);
		list($w_orig, $h_orig) = getimagesize($resized_file);

		//if (move_uploaded_file($temp, "../../upload/" .$name)) {
			ak_img_resize($resized_file, $path1, $w_orig, $h_orig, $fileExt, 1);
			//copy($resized_file, $path1);
			ak_img_resize($resized_file, $path2, $wmax, $hmax, $fileExt, 0);
 		//}


		echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "File successfully upload.")));
    }
}

?>
