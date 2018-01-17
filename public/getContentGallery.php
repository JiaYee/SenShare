<?php

 header("Access-Control-Allow-Origin: *");

if (isset($_POST["content_id"])) {
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
	
	$data = array();
	$queryString = "SELECT Concat('http://betweenlifestyle.com/senshare/upload/thumbnail/',SUBSTRING_INDEX(image.image_path, '/', -1))  tmp ,
	Concat('http://betweenlifestyle.com/senshare/upload/optimize/',SUBSTRING_INDEX(image.image_path, '/', -1))  src
	, image.description sub, image.id id, image.name name FROM image, content_image_link WHERE content_image_link.content_id = '".$_POST["content_id"]."' AND content_image_link.image_id = image.id";
	
	$result = $conn->query($queryString);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
			$data[] = $row;
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