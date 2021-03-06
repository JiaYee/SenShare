<?php
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
    
	$groupArray = array();
    
	$result = $conn->query("SELECT * FROM sub_category WHERE type = '".$_POST["category"]."' ORDER BY name DESC");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataArray = array();
			$subCatData = $conn->query("SELECT * FROM sub_category_data WHERE sub_category_id = '".$row->id."'");
			if ($subCatData && $subCatData->num_rows > 0) {
				while ($subCatDataRow = $subCatData->fetch_object()) {
					$dataArray[] = array("id" => $subCatDataRow->id, "name" => $subCatDataRow->name);
				}
			}
			$groupArray[] = array("id" => $row->id, "name" => $row->name, "sub_category_data" => $dataArray);
        }
	}
		
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "sub_category_group" => $groupArray));
		
    $conn->close();
?>