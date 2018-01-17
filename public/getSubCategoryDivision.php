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
	$result = $conn->query("SELECT distinct `sub_category`.main_category_id id, `sub_category`.name category_name,`sub_category`.id category_id, `sub_category_data`.name category_dataname, `sub_category_data`.id category_dataid FROM `sub_category` Inner join `sub_category_data` on sub_category.id = sub_category_data.sub_category_id where sub_category.main_category_id ='".$_POST["id"]."'");
	
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataArray[] = array("id" => $row->id, "category_name" => $row->category_name, "category_id" => $row->category_id, "category_dataname" => $row->category_dataname, "category_dataid" => $row->category_dataid);
        }
    }

    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray));
	
    $conn->close();
	
?>
