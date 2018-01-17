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
	
    $dataArray = array();
	
	$result = $conn->query("SELECT SD.id,SD.name FROM `sub_category` SC inner join `sub_category_data` SD on SD.Sub_Category_id = SC.id where SC.main_category_id = '".$_POST["id"]."'  ORDER BY name ASC");

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataArray[] = array("id" => $row->id, "name" => $row->name);
        }
    }

    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray));
	
    $conn->close();
	
?>