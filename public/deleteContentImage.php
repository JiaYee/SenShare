<?php

if (isset($_POST["content_id"]) && isset($_POST["image_id"])) {
    
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
	$_POST["image_id"] = $conn->real_escape_string($_POST["image_id"]);

	$deleteResult = $conn->query("DELETE FROM content_image_link WHERE content_id = '".$_POST["content_id"]."' AND image_id = '".$_POST["image_id"]."'");
	
	$deleteResult = $conn->query("DELETE FROM image WHERE id = '".$_POST["image_id"]."'");
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Main Category deleted successfully.")));
	
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>