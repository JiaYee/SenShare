<?php
if (isset($_POST["search_string"]) && isset($_POST["category_id"])) {
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
	$queryString = "SELECT id, name, image_path FROM content WHERE name LIKE '%".$_POST["search_string"]."%' AND category_id = '".$_POST["category_id"]."' ORDER BY name DESC";
	
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$dataArray[] = array("id" => $row->id, "name" => $row->name, "image_path" => $row->image_path);
        }
	}
		
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "data" => $dataArray));
		
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>