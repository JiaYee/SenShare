<?php
if (isset($_POST["json_sub_category"]) && isset($_POST["content_id"]) && isset($_POST["category_id"])) {
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$deleteResult = $conn->query("DELETE FROM content_sub_category_link WHERE content_id = '".$_POST["content_id"]."' AND category_id = '".$_POST["category_id"]."' and sub_category_data_id != 'all'");
	
    
	$dataArray = array();
	
	$filter = "";
	$jsonArray = json_decode($_POST["json_sub_category"], true);
	for($x = 0; $x <count($jsonArray); $x++)
	{
		//echo "sub_category_id:".$jsonArray[$x]["sub_category_id"];
		//echo "sub_category_data_id:".$jsonArray[$x]["sub_category_data_id"];
		$resultInsertDefault = $conn->query("INSERT INTO content_sub_category_link (content_id, sub_category_group_id, sub_category_data_id, category_id) VALUES ('".$_POST["content_id"]."', '".$jsonArray[$x]["sub_category_id"]."', '".$jsonArray[$x]["sub_category_data_id"]."', '".$_POST["category_id"]."')");
	}
		
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Content sub category updated successfully")));
		
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>