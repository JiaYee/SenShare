<?php

 header("Access-Control-Allow-Origin: *");

if (isset($_POST["category_id"]) && isset($_POST["content_id"])) {
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    
	// check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
    
	$_POST["category_id"] = $conn->real_escape_string($_POST["category_id"]);
	$_POST["content_id"] = $conn->real_escape_string($_POST["content_id"]);
	
	$data = "";
	$queryString = 	"SELECT main_category_data.name as categoryName ,content.* FROM `main_category_data` inner join `content` on content.category_id = main_category_data.id where content.category_id= '".$_POST["category_id"]."' and content.id= '".$_POST["content_id"]."' ";
	//$queryString = "SELECT content.id, content.name, content.description, content.type, content.address, content.phone_office, content.phone_mobile, content.weekday_business_hour, content.weekend_business_hour, content.image_path, content.latitude, content.longitude, content.category_id, main_category_data.name AS category_name FROM content, main_category_data WHERE content.category_id = '".$_POST["category_id"]."' AND content.id = '".$_POST["content_id"]."' AND content.category_id = main_category_data.id";
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$data = $row;
        }
	}
	header('Content-Type: application/json');	
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Query result"), "Data" => $data));
		
    $conn->close();
} else {
    header('Content-Type: application/json');
	echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>