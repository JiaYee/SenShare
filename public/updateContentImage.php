<?php

if (isset($_POST["image_id"]) && isset($_POST["name"]) && isset($_POST["description"]) && isset($_POST["image_path"])) {
    
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
	$_POST["description"] = $conn->real_escape_string($_POST["description"]);
	$_POST["image_path"] = $conn->real_escape_string($_POST["image_path"]);
	
	$result = $conn->query("UPDATE image SET name = '".$_POST["name"]."', description = '".$_POST["description"]."', image_path = '".$_POST["image_path"]."' WHERE id = '".$_POST["image_id"]."'");
	
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>