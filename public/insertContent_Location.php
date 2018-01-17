<?php

if (isset($_POST["location"]) && isset($_POST["content_id"]) && isset($_POST["main_category_id"])) {
    
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$_POST["location"] = $conn->real_escape_string($_POST["location"]);
	$_POST["content_id"] = $conn->real_escape_string($_POST["content_id"]);
	$_POST["main_category_id"] = $conn->real_escape_string($_POST["main_category_id"]);
	
	$result = $conn->query("INSERT INTO content_location (location, content_id, main_category_id) VALUES ('".$_POST["location"]."','".$_POST["content_id"]."','".$_POST["main_category_id"]."')");
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>