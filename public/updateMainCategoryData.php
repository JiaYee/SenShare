<?php

if (isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["image_path"]) && isset($_POST["type"])) {
    
	require_once('config.ini.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);

    // check connection
    if ($conn->connect_error) {
        echo json_encode(array("Response" => array("responseCode" => -100,
                "responseTitle" => "Database Not Found",
                "responseMessage" => "Unable to locate database in server")));
        die();
    }
	
	$_POST["name"] = $conn->real_escape_string($_POST["name"]);
	$_POST["id"] = $conn->real_escape_string($_POST["id"]);
	$_POST["image_path"] = $conn->real_escape_string($_POST["image_path"]);
	$_POST["type"] = $conn->real_escape_string($_POST["type"]);

    $result = $conn->query("UPDATE main_category_data SET name = '".$_POST["name"]."', image_path = '".$_POST["image_path"]."', type = '".$_POST["type"]."' WHERE id = '".$_POST["id"]."'");
	
    echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully updated.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>