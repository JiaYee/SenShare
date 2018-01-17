<?php
    header("Access-Control-Allow-Origin: *");
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
	$result = $conn->query("SELECT * FROM main_category_data WHERE valid_flag=1 AND user_id = '".$_POST["user_id"]."'  ORDER BY name ASC");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			//$dataArray[] = array("id" => $row->id, "name" => $row->name, "image_path" => $row->image_path);
			$contentResult = $conn->query("SELECT id FROM content WHERE category_id = '".$row->id."' AND MONTH(timestamp) = MONTH(NOW()) AND YEAR(timestamp) = YEAR(NOW())");
			$dataArray[] = array("id" => $row->id, "name" => $row->name, "image_path" => $row->image_path, "count" => $contentResult->num_rows);
        }
    }
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Success"),
	"Data" => $dataArray));

    $conn->close();
?>
