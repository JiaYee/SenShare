<?php

if (isset($_POST["name"]) && isset($_POST["main_category_id"])) {
    
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
	$_POST["main_category_id"] = $conn->real_escape_string($_POST["main_category_id"]);


	$result = $conn->query("INSERT INTO main_location (name, main_category_id) VALUES ('".$_POST["name"]."','".$_POST["main_category_id"]."')");
	echo json_encode(array("Response" => array("responseCode" => 200, "responseMessage" => "Data successfully inserted.")));
    
    $conn->close();
} else {
    echo json_encode(array("Response" => array("responseCode" => -100, "responseMessage" => "Field name cannot be empty")));
}
?>