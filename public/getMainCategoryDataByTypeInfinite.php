<?php
	
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 200');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	// Image path 
	$imgPath="";
	$Tsql = "SELECT `SettingValue` FROM `settings` WHERE `SettingCode`='ImgPath'";
	$Tresult =$conn->query($Tsql);
	if ($Tresult) {
        while ($row = $Tresult->fetch_object()) {
			$imgPath = $row->SettingValue;
        }
    }
	// 
	
    $dataArray = array();
	if($_POST["start"] == -1)
	{
	$result = $conn->query("SELECT *,Concat('".$imgPath."','optimize/',SUBSTRING_INDEX(image_path, '/', -1)) as opt_img FROM main_category_data WHERE type = '".$_POST["type"]."' ORDER BY name ASC ");
	}
	else
	{
	$result = $conn->query("SELECT *,Concat('".$imgPath."','optimize/',SUBSTRING_INDEX(image_path, '/', -1)) as opt_img FROM main_category_data WHERE type = '".$_POST["type"]."' ORDER BY name ASC limit ".$_POST["start"].",5 ");
	}
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			//$dataArray[] = array("id" => $row->id, "name" => $row->name, "image_path" => $row->opt_img);
			$contentResult = $conn->query("SELECT id FROM content WHERE category_id = '".$row->id."' AND MONTH(timestamp) = MONTH(NOW()) AND YEAR(timestamp) = YEAR(NOW())");
			$dataArray[] = array("id" => $row->id, "name" => $row->name, "image_path" => $row->opt_img, "count" => $contentResult->num_rows);			
        }
    }

    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray));
	
    $conn->close();
	
?>
