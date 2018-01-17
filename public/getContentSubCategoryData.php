<?php
if (isset($_POST["content_id"]) && isset($_POST["category_id"])) {
  
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
    
	$_POST["content_id"] = $conn->real_escape_string($_POST["content_id"]);
	$_POST["category_id"] = $conn->real_escape_string($_POST["category_id"]);
	
	$groupArray = array();
    
	$result = $conn->query("SELECT * FROM sub_category ORDER BY name DESC");
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataArray = array();
			$subCatData = $conn->query("SELECT * FROM sub_category_data WHERE sub_category_id = '".$row->id."'");
			if ($subCatData && $subCatData->num_rows > 0) {
				while ($subCatDataRow = $subCatData->fetch_object()) {
					$dataArray[] = array("id" => $subCatDataRow->id, "name" => $subCatDataRow->name);
				}
			}
			
			$selectedSubCategoryDataId = "all";
			$contentData = $conn->query("SELECT sub_category_data_id FROM content_sub_category_link WHERE category_id = '".$_POST["category_id"]."' AND content_id = '".$_POST["content_id"]."' AND sub_category_group_id = '".$row->id."'");
			if ($contentData && $contentData->num_rows > 0) {
				while ($contentDataRow = $contentData->fetch_object()) {
					if($contentDataRow->sub_category_data_id != "all")
						$selectedSubCategoryDataId = $contentDataRow->sub_category_data_id;
				}
			}
			
			$groupArray[] = array("id" => $row->id, "name" => $row->name, "sub_category_data" => $dataArray, "selected_sub_category_id" => $selectedSubCategoryDataId);
        }
	}
		
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "sub_category_group" => $groupArray));
		
    $conn->close();
}
 else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>