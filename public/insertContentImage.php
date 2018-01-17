<?php

if (isset($_POST["content_id"]) && isset($_POST["category_id"]) && isset($_POST["name"]) && isset($_POST["description"]) && isset($_POST["image_path"])) {
    
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
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);
	$_POST["description"] = $conn->real_escape_string($_POST["description"]);
	$_POST["image_path"] = $conn->real_escape_string($_POST["image_path"]);
	
	$result = $conn->query("INSERT INTO image (name, description, image_path) VALUES ('".$_POST["name"]."', '".$_POST["description"]."', '".$_POST["image_path"]."')");
	$result = $conn->query("INSERT INTO content_image_link (content_id, image_id, category_id) VALUES ('".$_POST["content_id"]."', LAST_INSERT_ID(), '".$_POST["category_id"]."')");
	header('Content-Type: application/json');	
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    $conn->close();
} else {
header('Content-Type: application/json');
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>