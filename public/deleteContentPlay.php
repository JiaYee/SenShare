<?php

if (isset($_POST["play_id"]) && isset($_POST["content_id"]) && isset($_POST["category_id"])) {
    
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
	$_POST["play_id"] = $conn->real_escape_string($_POST["play_id"]);

	$deleteResult = $conn->query("DELETE FROM play WHERE content_id = '".$_POST["content_id"]."' AND category_id = '".$_POST["category_id"]."' AND play_id = '".$_POST["play_id"]."'");
	
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Content deleted successfully.")));
	
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>